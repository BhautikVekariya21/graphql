"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = exports.connectToDatabase = void 0;
// lib/db.ts
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Enable logging for queries and errors
});
exports.prismaClient = prismaClient;
async function connectToDatabase() {
    try {
        await prismaClient.$connect();
        console.log('Connected to MongoDB successfully.');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
exports.connectToDatabase = connectToDatabase;
connectToDatabase();
