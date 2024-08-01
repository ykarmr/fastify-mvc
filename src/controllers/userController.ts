import { FastifyReply, FastifyRequest } from "fastify";
import * as userService from "../services/userService";
import { UserRole } from "@prisma/client";

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const users = await userService.getUsers();
  reply.send(users);
};

export const getUserById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const user = await userService.getUserById(Number(request.params.id));
  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({ message: "User not found" });
  }
};

export const addUser = async (
  request: FastifyRequest<{
    Body: { name: string; email: string; password: string; role: UserRole };
  }>,
  reply: FastifyReply
) => {
  const user = await userService.addUser(request.body);
  reply.status(201).send(user);
};

export const updateUser = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<{
      name: string;
      email: string;
      password: string;
      role: UserRole;
    }>;
  }>,
  reply: FastifyReply
) => {
  const user = await userService.updateUser(
    Number(request.params.id),
    request.body
  );
  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({ message: "User not found" });
  }
};

export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const success = await userService.deleteUser(Number(request.params.id));
  if (success) {
    reply.status(204).send();
  } else {
    reply.status(404).send({ message: "User not found" });
  }
};

export const loginUser = async (
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) => {
  try {
    const { token, user } = await userService.authenticateUser(
      request.body.email,
      request.body.password
    );
    reply.send({ token, user });
  } catch (error) {
    reply.status(401).send({ message: "Invalid email or password" });
  }
};
