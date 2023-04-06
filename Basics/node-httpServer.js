const http = require("http");

const server = http.createServer((req, res) => {
  res.end("First Web server");
});

server.listen(3000, () => {
  console.log("Server is started. Ready to server at port 3000");
});
