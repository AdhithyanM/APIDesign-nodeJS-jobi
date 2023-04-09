const express = require("express");
require("dotenv").config({ path: "./config/config.env" }); // setting up config.env file variables
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");

//-------------------------------------INTERNAL IMPORT
//-----DB IMPORT
const connectDb = require("./config/database");
//-----MIDDLEWARE IMPORT
const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");
//-----ROUTES IMPORT
const jobs = require("./routes/jobs");
const auth = require("./routes/auth");
const user = require("./routes/user");

const app = express();

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files in public directory
app.use(express.static("public"));

// Setup security headers
app.use(helmet());

// Setup body parser
app.use(express.json());

// Set Cookie Parser
app.use(cookieParser());

// Handle File Uploads
app.use(fileUpload());

// Sanitize data to prevent mongo operator injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: ["positions"],
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 100,
});
app.use(limiter);

// Setup CORS - accessible by other domains
app.use(cors());

// Handling Uncaught Exception  - should be on top
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception.");
  process.exit(1);
});

// Connecting to database
connectDb();

// ROUTES CONFIGURATION
app.use("/api/v1", jobs);
app.use("/api/v1", auth);
app.use("/api/v1", user);
app.use("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found.`, 404));
});
app.use(errorMiddleware);

// Server listening
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
