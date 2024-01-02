require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Routes go here

app.get("/events", async (req, res) => {
  try {
    const fetchedData = await mongoose.connection
      .collection("events")
      .find({})
      .toArray();
    res.json(fetchedData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
app.get("/menu", async (req, res) => {
  try {
    const fetchedData = await mongoose.connection
      .collection("menu")
      .find({})
      .toArray();
    res.json(fetchedData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
app.get("/reports", async (req, res) => {
  try {
    const fetchedData = await mongoose.connection
      .collection("reports")
      .find({})
      .toArray();
    res.json(fetchedData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/create-report", async (req, res) => {
  try {
    console.log(req.query);
    const newReport = await mongoose.connection
      .collection("reports")
      .insertOne(req.query);
    res.json(newReport);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
