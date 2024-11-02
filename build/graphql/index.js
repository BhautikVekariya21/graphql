"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApolloServer = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userservice_1 = __importDefault(require("../services/userservice"));
const user_1 = require("./user");
async function startApolloServer() {
    const app = (0, express_1.default)();
    // Initialize Apollo Server
    const gqlServer = new server_1.ApolloServer({
        typeDefs: [user_1.typeDefs],
        resolvers: {
            Query: {
                ...user_1.resolvers.Query,
            },
            Mutation: {
                ...user_1.resolvers.Mutation,
            },
        },
    });
    // Start the Apollo Server
    await gqlServer.start();
    // Middleware for authentication and context
    app.use('/graphql', (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(gqlServer, {
        context: async ({ req }) => {
            const authHeader = req.headers.authorization || '';
            const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
            if (token) {
                try {
                    const user = userservice_1.default.decodeJWTToken(token);
                    return { user };
                }
                catch (error) {
                    // Explicitly cast error to Error to access message property
                    const errMessage = error instanceof Error ? error.message : 'Unknown error';
                    console.error('Failed to authenticate token:', errMessage);
                    throw new Error('Invalid token');
                }
            }
            return { user: null };
        },
    }));
    return app;
}
exports.startApolloServer = startApolloServer;
// Initialize and start the server
(async () => {
    const app = await startApolloServer();
    app.listen({ port: 4000 }, () => {
        console.log('🚀 Server is running at http://localhost:5055/graphql');
    });
})();
