import jwt, { SignOptions } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

/**
 * @param { SignOptions } options
 */
export const generateToken = async function (data, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, options, (err, token) => {
      if (err) {
        reject(err)
        return
      }
      resolve(token)
    })
  })
}

export const verifyToken = async function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        reject(err)
        return
      }
      resolve(decode)
    })
  })
}
