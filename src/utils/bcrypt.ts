import bcrypt from "bcryptjs"

type HashProps = {
  password: string
}

type CheckPasswordProps = HashProps & {
  password_hash: string
}

export async function hash({ password }: HashProps): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 8)

  return hashedPassword
}

export async function checkPassword({
  password,
  password_hash,
}: CheckPasswordProps): Promise<boolean> {
  const isValid = await bcrypt.compare(password, password_hash)

  return isValid
}
