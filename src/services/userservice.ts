import { User } from '../types';
import jwt from 'jsonwebtoken';

export type CreateUserPayload = {
  email: string;
  firstName: string;
  lastName: string;
};

class UserService {
  private users: User[] = [];

  async createUser(payload: CreateUserPayload): Promise<User> {
    const newUser: User = {
      id: `${this.users.length + 1}`,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
    this.users.push(newUser);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserToken({ email, password }: { email: string; password: string }): Promise<string> {
    const user = this.users.find(user => user.email === email);
    if (!user) throw new Error("User not found");

    // Generate a token (simplified for demonstration)
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "your_jwt_secret");
    return token;
  }

  decodeJWTToken(token: string): any {
    if (!token) throw new Error("No token provided");
    const secretKey = process.env.JWT_SECRET || "your_jwt_secret";
    return jwt.verify(token, secretKey);
  }
}

export default new UserService();
