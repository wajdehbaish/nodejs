const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const cors = require("cors");
const Users = require("./Users");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

let id = 0;

app.get("/", (req, res) => {
  res.send(Users);
});
app.get("/:id", (req, res) => {
  res.send(Users);
});

app.post("/", (req, res) => {
  const buffer = fs.readFileSync(path.resolve(__dirname, "users.json"));
  const users = JSON.parse(buffer.toString());
  users.push({
    id: ++id,
    name: req.body.name,
    passportId: req.body.passportId,
    cash: req.body.cash,
    credit: req.body.credit,
  });
  fs.writeFileSync(
    path.resolve(__dirname, "users.json"),
    JSON.stringify(users)
  );
  res.send(users);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  const buffer = fs.readFileSync(path.resolve(__dirname, "users.json"));
  let users = JSON.parse(buffer.toString());
  let userTemp = users.find((user) => user.id === id);
  if (userTemp) {
    users = users.map((u) => {
      if (u.id === parseInt(id)) u = user;
      return u;
    });
  }

  console.log(users);
  fs.writeFileSync(
    path.resolve(__dirname, "users.json"),
    JSON.stringify(users)
  );
  res.send(users);
});
app.listen(3000);
