import Fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import fastifyJwt from "@fastify/jwt";
import * as dotenv from "dotenv";

dotenv.config();

const app = Fastify();

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});

app.register(userRoutes);

export default app;
