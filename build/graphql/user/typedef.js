"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  type User {
      id: ID!
      firstName: String!
      lastName: String
      email: String!
      profileImageURL: String
  }

  type Query {
      getUserToken(email: String!, password: String!): AuthPayload
      getCurrentLoggedInUser: User
  }

  type Mutation {
      createUser(firstName: String!, lastName: String, email: String!, password: String!): UserResponse
      logout: LogoutResponse
  }

  type AuthPayload {
      token: String!
  }

  type UserResponse {
      id: ID!
      email: String!
      firstName: String!
  }

  type LogoutResponse {
      message: String!
  }
`;
