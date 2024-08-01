import { User, UserRole } from "@prisma/client";
import * as userModel from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/hashUtils";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const getUsers = () => {
  return userModel.findAll();
};

export const getUserById = (id: number) => {
  return userModel.findById(id);
};

export const addUser = async (user: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) => {
  user.password = await hashPassword(user.password);
  return userModel.create(user);
};

export const updateUser = (id: number, updateUser: Partial<User>) => {
  return userModel.update(id, updateUser);
};

export const deleteUser = (id: number) => {
  return userModel.remove(id);
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await userModel.findByEmail(email);
  if (user && (await comparePassword(password, user.password))) {
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token, user };
  }
  throw new Error("Invalid email or password");
};
