import express from "express";
import mongoose from "mongoose"; // Import mongoose for MongoDB connection
import dotenv from "dotenv"; // Import dotenv for environment variables
import { startApolloServer } from "./graphql"; // Ensure this correctly exports your Apollo Server setup
import cookieParser from "cookie-parser"; // Import cookie-parser for handling cookies

// Load environment variables
dotenv.config();

async function init() {
  const app = await startApolloServer(); // Initialize Apollo Server
  const PORT = Number(process.env.PORT) || 4000; // Use the specified port or default to 4000

  // Middleware setup
  app.use(express.json());
  app.use(cookieParser()); // Enable cookie parsing middleware

  // Basic route for health check
  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  // Connect to MongoDB
  const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/graphql_db";
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
  });
}

// Initialize the application
init();
