const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
// setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

// connecting to database
const connectDb = require("./config/database");
connectDb();

// importing all routes
const jobs = require("./routes/jobs");
app.use("/api/v1", jobs);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in ${process.env.NODE_ENVIRONMENT} mode`
  );
});
