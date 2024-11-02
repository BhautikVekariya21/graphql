"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const UserService_1 = __importDefault(require("../../services/UserService"));
const COOKIE_NAME = "auth_token";
const queries = {
    getUserToken: async (_, payload, { res } // Adding res to context to set cookies
    ) => {
        const token = await UserService_1.default.getUserToken({
            email: payload.email,
            password: payload.password,
        });
        // Set token as a cookie
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour expiry
        });
        return { token };
    },
    getCurrentLoggedInUser: async (_, __, { user }) => {
        if (user) {
            const userData = await UserService_1.default.getUserById(user.id);
            return userData;
        }
        throw new Error("User not authenticated");
    },
};
const mutations = {
    createUser: async (_, payload) => {
        const user = await UserService_1.default.createUser(payload);
        return { id: user.id, email: user.email, firstName: user.firstName };
    },
    logout: async (_, __, { res }) => {
        res.clearCookie(COOKIE_NAME);
        return { message: "Logged out successfully" };
    },
};
exports.resolvers = { queries, mutations };
