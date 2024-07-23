const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Load Models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

// Connect to DB - Loading MONGO_URI from environment variable
mongoose.connect(process.env.MONGO_URI);

// Read JSON files - JSON.parse() converts the data to a JSON object
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import into DB - function
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);

    console.log("Data Imported...".green.bold.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Destroy Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log("Data Destroyed...".red.bold.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
