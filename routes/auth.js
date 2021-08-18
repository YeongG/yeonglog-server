import { FastifyInstance } from "fastify"
import db from "../database"
import bcryp from "bcrypt"
import { prisma } from "@prisma/client"
import P from "pino"
import { generateToken } from "../lib/tokens"

/**
 * @param { FastifyInstance } fastify
 */

export default async function (fastify) {
  fastify.post("/register", async (request, reply) => {
    const { username, password } = request.body

    const exeist = await db.user.findUnique({ where: { username } })
    if (exeist) {
      reply.status(409)
      throw new Error("Username already exists")
    }

    const hash = await bcryp.hash(password, 10)
    const user = await db.user.create({
      data: {
        username,
        passwordHash: hash,
      },
      select: {
        username: true,
      },
    })
    const token = await generateToken({ user }, { expiresIn: "1d" })
    return { ...user, token }
  })
  fastify.post("/login", async (request, reply) => {
    const { username, password } = request.body

    const user = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      reply.status(401)
      throw new Error("Login failed")
    }
    db.post.create({
      data: {
        comments: [],
      },
    })

    const isMatch = await bcryp.compare(password, user.passwordHash)
    if (!isMatch) {
      reply.status(401)
      throw new Error("Login failed")
    }

    const token = await generateToken({ user }, { expiresIn: "1d" })
    console.log(token)
    return { token }
  })
}
