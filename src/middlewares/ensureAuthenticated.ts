import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

import authConfig from "../config/auth"
import prisma from "../db"
import AppError from "../errors/AppError"

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

export default async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT token não fornecido", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const decoded = verify(token, authConfig.secret)

    const tokenExist = await prisma.token.findFirst({
      where: {
        token,
      },
    })

    if (!tokenExist) {
      throw new AppError("Token inválido", 401)
    }

    const { sub } = decoded as TokenPayload

    request.client = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError("JWT token inválido", 401)
  }
}
