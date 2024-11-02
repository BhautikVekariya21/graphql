// lib/db.ts
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Enable logging for queries and errors
});

export async function connectToDatabase() {
  try {
    await prismaClient.$connect();
    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

export { prismaClient };
