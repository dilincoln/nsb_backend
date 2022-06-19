import { User } from "@prisma/client"
import { sign } from "jsonwebtoken"

import authConfig from "../../config/auth"
import prisma from "../../db"
import AppError from "../../errors/AppError"
import { checkPassword } from "../../utils/bcrypt"

type Request = {
  email: string
  password: string
}

type Response = {
  user: Omit<User, "password_hash" | "address_id" | "active">
  token: string
}

class AuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userExist = await prisma.user.findFirst({
      where: {
        email,
        active: true,
      },
      include: {
        address: true,
      },
    })

    if (!userExist) {
      throw new AppError("Credenciais incorretas")
    }

    const passwordMatched = await checkPassword({
      password,
      password_hash: userExist.password_hash,
    })

    if (!passwordMatched) {
      throw new AppError("Credenciais incorretas")
    }

    const tokenExist = await prisma.token.findMany({
      where: {
        owner_id: userExist.id,
      },
    })

    // Max 1 tokens per user
    if (tokenExist.length >= 1) {
      await prisma.token.delete({
        where: {
          id: tokenExist[0].id,
        },
      })
    }

    const token = await prisma.token.create({
      data: {
        token: sign({}, authConfig.secret, {
          subject: userExist.id.toString(),
          expiresIn: authConfig.expiresIn,
        }),
        owner_id: userExist.id,
      },
    })

    const { active, address_id, password_hash, ...rest } = userExist

    return {
      user: {
        ...rest,
      },
      token: token.token,
    }
  }
}

export default AuthenticateService
