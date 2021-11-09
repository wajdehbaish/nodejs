const fs = require("fs");

fs.writeFileSync("notes.txt", "this file was created by node.js");
fs.copyFileSync("notes.txt", "copy-of-note.txt");
fs.rename("copy-of-note.txt", "note2.txt",(err)=>{
    if(err) throw err;
    console.log("\nFile Rename");
});
console.log(fs.readdirSync("./"));
fs.appendFileSync("notes.txt", "hi");
