const express = require("express");
require("dotenv").config({ path: "./config/config.env" }); // setting up config.env file variables

//-----------INTERNAL IMPORT
//-----DB IMPORT
const connectDb = require("./config/database");
//-----MIDDLEWARE IMPORT
const errorHandler = require("./middlewares/errors");
//-----ROUTES IMPORT
const jobs = require("./routes/jobs");

const app = express();
app.use(express.json());
// connecting to database
connectDb();
// configuring routes
app.use("/api/v1", jobs);
app.use(errorHandler);

// server listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in ${process.env.NODE_ENVIRONMENT} mode`
  );
});
