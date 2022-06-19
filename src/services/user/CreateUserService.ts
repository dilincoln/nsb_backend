import { Address, User } from "@prisma/client"
import * as Yup from "yup"

import prisma from "../../db"
import AppError from "../../errors/AppError"
import { hash } from "../../utils/bcrypt"

type CreateUserServiceProps = Omit<
  User,
  "id" | "active" | "password_hash" | "address_id" | "created_at" | "updated_at"
> &
  Omit<Address, "id" | "address_id" | "created_at" | "updated_at"> & {
    password: string
    confirm_password: string
  }

class CreateUserService {
  async execute(props: CreateUserServiceProps) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().max(50).required("Nome obrigatório"),
        email: Yup.string()
          .email("Digite um e-mail válido")
          .max(50)
          .required("E-mail obrigatório"),
        gender: Yup.string().test({
          name: "gender",
          message: "Gênero obrigatório",
          test: value => {
            const isValid = ["m", "f"].includes(value)

            return isValid
          },
        }),
        cpf: Yup.string()
          .length(11, "Digite um CPF válido")
          .required("CPF obrigatório"),
        birth_date: Yup.date(),
        blood_type: Yup.string().test({
          name: "blood_type",
          message: "Tipo sanguíneo inválido",
          test: value => {
            const isValid = [
              "A+",
              "B+",
              "O+",
              "AB+",
              "A-",
              "B-",
              "O-",
              "AB-",
              undefined,
            ].includes(value)

            return isValid
          },
        }),
        password: Yup.string()
          .min(8, "Digite uma senha de no mínimo 8 caracteres")
          .max(30, "Digite uma senha de no máximo 30 caracteres")
          .required("Senha obrigatória"),
        confirm_password: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Confirmação de senha incorreta",
        ),
        street: Yup.string()
          .max(50, "Digite no máximo 50 caracteres")
          .required("Rua obrigatória"),
        number: Yup.string().required("Número da residência obrigatório"),
        complement: Yup.string().max(50, "Digite no máximo 50 caracteres"),
        district: Yup.string()
          .max(50, "Digite no máximo 50 caracteres")
          .required("Bairro obrigatório"),
        zip_code: Yup.string()
          .length(8, "Digite um CEP válido")
          .required("CEP obrigatório"),
        city: Yup.string()
          .max(50, "Digite no máximo 50 caracteres")
          .required("Cidade obrigatória"),
        state: Yup.string()
          .max(2, "Digite uma sigla de um estado válido")
          .required("Estado obrigatório"),
      })

      await schema.validate(props)

      const {
        name,
        email,
        gender,
        cpf,
        blood_type,
        birth_date,
        password,
        street,
        number,
        complement,
        district,
        zip_code,
        city,
        state,
      } = props

      const userExist = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: {
                equals: email,
              },
            },
            {
              cpf: {
                equals: cpf,
              },
            },
          ],
        },
      })

      if (userExist) {
        throw new AppError("CPF já cadastrado", 400)
      }

      const password_hash = await hash({
        password,
      })

      const user = await prisma.user.create({
        data: {
          active: true,
          name,
          gender,
          email,
          cpf,
          blood_type,
          birth_date,
          password_hash,
          address: {
            create: {
              street,
              number,
              complement,
              district,
              zip_code,
              city,
              state,
            },
          },
        },
      })

      delete user.password_hash

      return user
    } catch (error) {
      throw new AppError(error.message || error.errors[0], 403)
    }
  }
}

export default CreateUserService
