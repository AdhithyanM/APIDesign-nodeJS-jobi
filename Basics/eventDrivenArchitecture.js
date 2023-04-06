const events = require("events");

// Creating an event emitter
const eventEmitter = new events.EventEmitter();

// event listeners
eventEmitter.on("connection", () => {
  console.log("Connection Successfull.");
});
eventEmitter.on("something", () => {
  console.log("Something happened");
});

// event emitters
eventEmitter.emit("connection");
eventEmitter.emit("something");
eventEmitter.emit("notConfigured");
