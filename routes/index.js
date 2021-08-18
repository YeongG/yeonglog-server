import { FastifyInstance } from "fastify";
import authRouter from "./auth";

/**
 * @param { FastifyInstance } fastify
 */

export default async function (fastify) {
  fastify.register(authRouter, { prefix: "/auth" });
}
