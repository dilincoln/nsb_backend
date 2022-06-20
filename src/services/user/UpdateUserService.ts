import { Address, User } from "@prisma/client"

import prisma from "../../db"
import AppError from "../../errors/AppError"

type Request = Omit<
  User,
  "active" | "password_hash" | "address_id" | "created_at" | "updated_at"
> &
  Omit<Address, "id" | "created_at" | "updated_at">

class UpdateUserService {
  public async execute(props: Partial<Request>) {
    const {
      id,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip_code,
      ...rest
    } = props

    if (!id) {
      throw new AppError("Id do usuário obrigatório")
    }

    const userExist = await prisma.user.findUnique({
      where: { id },
    })

    if (!userExist) {
      throw new AppError("Usuário não encontrado")
    }

    const cpfExist = await prisma.user.findFirst({
      where: {
        id: {
          not: id,
        },
        cpf: props.cpf,
      },
    })

    if (cpfExist) {
      throw new AppError("CPF já cadastrado")
    }

    const emailExist = await prisma.user.findFirst({
      where: {
        id: {
          not: id,
        },
        email: props.email,
      },
    })

    if (emailExist) {
      throw new AppError("Email já cadastrado")
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...rest,
        address: {
          update: {
            street,
            number,
            complement,
            district,
            city,
            state,
            zip_code,
          },
        },
      },
      include: {
        address: true,
      },
    })

    return updatedUser
  }
}

export default UpdateUserService
