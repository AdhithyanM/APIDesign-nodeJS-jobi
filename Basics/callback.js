const fs = require("fs");

// synchronous file reading
// let data = fs.readFileSync("example.txt");
// console.log(data.toString());

// asynchronous file reading with callback
fs.readFile("example.txt", (error, data) => {
  if (error) {
    return console.log(error);
  }
  console.log(data.toString());
});

console.log("Program Ended");
