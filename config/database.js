const mongoose = require("mongoose");

const dbUrl = process.env.DB_LOCAL_URI;

const connectDb = () => {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `MongoDB database connected with host: ${con.connection.host}`
      );
    });
};

module.exports = connectDb;
