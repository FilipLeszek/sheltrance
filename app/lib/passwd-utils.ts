import bcrypt from "bcrypt";

export async function hashPassword(unHashPass: string) {
  return bcrypt.hash(unHashPass, 10).then((result) => result);
}

export async function comparePasswords(unHashPass: string, hashPass: string) {
  const result = await bcrypt.compare(unHashPass, hashPass);
  return result;
}
