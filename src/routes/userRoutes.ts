import { FastifyInstance } from "fastify";
import * as userController from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { UserRole } from "@prisma/client";

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/login", userController.loginUser);
  app.post("/users", userController.addUser);

  const options = {
    preHandler: authMiddleware,
  };
  app.get("/users", options, userController.getUsers);
  app.get<{
    Params: { id: string };
    Body: Partial<{
      name: string;
      email: string;
      password: string;
      role: UserRole;
    }>;
  }>("/users/:id", options, userController.getUserById);
  app.put<{
    Params: { id: string };
    Body: Partial<{
      name: string;
      email: string;
      password: string;
      role: UserRole;
    }>;
  }>("/users/:id", options, userController.updateUser);
  app.delete<{
    Params: { id: string };
  }>("/users/:id", options, userController.deleteUser);
};
