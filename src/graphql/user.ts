import { gql } from 'apollo-server-express';
import UserService, { CreateUserPayload } from '../services/userservice';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    users: [User!]!
    getUserToken(email: String!, password: String!): String
    getCurrentLoggedInUser: User
  }

  type Mutation {
    createUser(email: String!, firstName: String!, lastName: String!): String!
  }
`;

export const resolvers = {
  Query: {
    users: async () => {
      return await UserService.getAllUsers();
    },
    getUserToken: async (_: any, { email, password }: { email: string; password: string }) => {
      return await UserService.getUserToken({ email, password });
    },
    getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
      if (context && context.user) {
        const id = context.user.id;
        return await UserService.getUserById(id);
      }
      throw new Error("I don't know who you are");
    },
  },
  Mutation: {
    createUser: async (_: any, payload: CreateUserPayload) => {
      const res = await UserService.createUser(payload);
      return res.id;
    },
  },
};
