import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserService from '../services/userservice';
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user';

export async function startApolloServer() {
  const app = express();

  // Initialize Apollo Server
  const gqlServer = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: {
      Query: {
        ...userResolvers.Query,
      },
      Mutation: {
        ...userResolvers.Mutation,
      },
    },
  });

  // Start the Apollo Server
  await gqlServer.start();

  // Middleware for authentication and context
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(gqlServer, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (token) {
          try {
            const user = UserService.decodeJWTToken(token);
            return { user };
          } catch (error: unknown) {
            // Explicitly cast error to Error to access message property
            const errMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Failed to authenticate token:', errMessage);
            throw new Error('Invalid token');
          }
        }

        return { user: null };
      },
    })
  );

  return app;
}

// Initialize and start the server
(async () => {
  const app = await startApolloServer();
  app.listen({ port: 4000 }, () => {
    console.log('🚀 Server is running at http://localhost:5055/graphql');
  });
})();
