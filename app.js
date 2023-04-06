const express = require("express");
const dotenv = require("dotenv");

// setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
