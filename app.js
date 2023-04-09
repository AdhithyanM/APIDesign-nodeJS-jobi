const express = require("express");
require("dotenv").config({ path: "./config/config.env" }); // setting up config.env file variables
const cookieParser = require("cookie-parser");

//-----------INTERNAL IMPORT
//-----DB IMPORT
const connectDb = require("./config/database");
//-----MIDDLEWARE IMPORT
const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");
//-----ROUTES IMPORT
const jobs = require("./routes/jobs");
const auth = require("./routes/auth");

const app = express();
app.use(express.json());
// Set Cookie Parser
app.use(cookieParser());

// Handling Uncaught Exception  - should be on top
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception.");
  process.exit(1);
});

// connecting to database
connectDb();
// configuring routes
app.use("/api/v1", jobs);
app.use("/api/v1", auth);
app.use("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found.`, 404));
});
app.use(errorMiddleware);

// server listening
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in ${process.env.NODE_ENVIRONMENT} mode`
  );
});

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
