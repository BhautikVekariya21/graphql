"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const userservice_1 = __importDefault(require("../services/userservice"));
exports.typeDefs = (0, apollo_server_express_1.gql) `
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
exports.resolvers = {
    Query: {
        users: async () => {
            return await userservice_1.default.getAllUsers();
        },
        getUserToken: async (_, { email, password }) => {
            return await userservice_1.default.getUserToken({ email, password });
        },
        getCurrentLoggedInUser: async (_, parameters, context) => {
            if (context && context.user) {
                const id = context.user.id;
                return await userservice_1.default.getUserById(id);
            }
            throw new Error("I don't know who you are");
        },
    },
    Mutation: {
        createUser: async (_, payload) => {
            const res = await userservice_1.default.createUser(payload);
            return res.id;
        },
    },
};
