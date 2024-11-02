"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose")); // Import mongoose for MongoDB connection
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv for environment variables
const graphql_1 = require("./graphql"); // Ensure this correctly exports your Apollo Server setup
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Import cookie-parser for handling cookies
// Load environment variables
dotenv_1.default.config();
async function init() {
    const app = await (0, graphql_1.startApolloServer)(); // Initialize Apollo Server
    const PORT = Number(process.env.PORT) || 4000; // Use the specified port or default to 4000
    // Middleware setup
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)()); // Enable cookie parsing middleware
    // Basic route for health check
    app.get("/", (req, res) => {
        res.json({ message: "Server is up and running" });
    });
    // Connect to MongoDB
    const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/graphql_db";
    try {
        await mongoose_1.default.connect(mongoUrl);
        console.log("Connected to MongoDB successfully.");
    }
    catch (error) {
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
