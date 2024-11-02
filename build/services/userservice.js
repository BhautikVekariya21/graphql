"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    users = [];
    async createUser(payload) {
        const newUser = {
            id: `${this.users.length + 1}`,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
        };
        this.users.push(newUser);
        return newUser;
    }
    async getAllUsers() {
        return this.users;
    }
    async getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    async getUserToken({ email, password }) {
        const user = this.users.find(user => user.email === email);
        if (!user)
            throw new Error("User not found");
        // Generate a token (simplified for demonstration)
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "your_jwt_secret");
        return token;
    }
    decodeJWTToken(token) {
        if (!token)
            throw new Error("No token provided");
        const secretKey = process.env.JWT_SECRET || "your_jwt_secret";
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
}
exports.default = new UserService();
