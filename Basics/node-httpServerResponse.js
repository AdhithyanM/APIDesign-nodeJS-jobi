const http = require("http");

const data = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Vicky",
  },
  {
    id: 3,
    name: "Abhi",
  },
  {
    id: 4,
    name: "Akash",
  },
];

const server = http.createServer((req, res) => {
  // setting response headers to provide meta information of the response to the client
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Language", "en-US");
  res.setHeader("Date", new Date(Date.now()));
  res.setHeader("X-Powered-By", "Node.js");
  // In express we can send the object directly in response but in node server we always do stringify.
  res.end(
    JSON.stringify({
      success: true,
      total: data.length,
      data: data,
    })
  );
});

server.listen(3000, () => {
  console.log("Server is stared");
});
