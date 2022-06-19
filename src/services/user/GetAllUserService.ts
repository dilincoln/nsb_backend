import prisma from "../../db"

type GetAllUserServiceProps = {
  includeRelations: boolean
}

class GetAllUserService {
  public async execute(
    { includeRelations }: GetAllUserServiceProps = { includeRelations: false },
  ) {
    const users = await prisma.user.findMany({
      include: {
        address: includeRelations,
      },
    })

    const usersWithoutHashPassword = users.map(user => {
      const { password_hash, ...userWithoutPassword } = user

      return userWithoutPassword
    })

    return usersWithoutHashPassword
  }
}

export default GetAllUserService
