import bcrypt, { genSalt, hash } from 'bcrypt'

const createHashPassword = async (password: string) => {
  const saltHash: string = await genSalt(10)
  const passwordHash = await hash(password, saltHash)

  return passwordHash
}

const verifyPassword = async (password: string, hash: string) => {
  const compare = await bcrypt.compare(password, hash)

  return compare
}

export { createHashPassword, verifyPassword }
