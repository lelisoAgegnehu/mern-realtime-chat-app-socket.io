import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

//setup
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("common"));

// MONGOOSE CONFIGURATION
const PORT = process.env.PORT || 5001;
const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port :' ${PORT}`));
  })
  .catch((err) => console.log(`Did not connected`, err));
