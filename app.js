import fastify from "fastify";
import dotenv from "dotenv";
import routes from "./routes";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = fastify({ logger: true });

app.register(routes);

app.listen(process.env.PORT).then((value) => {
  console.log(value);
});

PrismaClient;
