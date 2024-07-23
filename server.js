const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// DB Connection
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const app = express();

// Middleware for bodyparser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// Custom Error Handler
// Must be under the Mount Routers, otherwise it won't work...
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 5000;

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: { id: 1 } });
});

// Server listening on PORT
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // Close server and exit process
  server.close(() => process.exit(1));
});
