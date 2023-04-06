const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  // console.log(req); // params, query, url, body ... - properties in req object

  res.status(200).json({
    message: "All about request object.",
  });
});

app.post("/", (req, res) => {
  // console.log(req.body);
  res.status(200).send(req.body);
});

app.listen(3000, () => {
  console.log("Server is started at port 3000");
});
