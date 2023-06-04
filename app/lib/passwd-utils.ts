import * as bcrypt from "bcrypt";

export function hashPassword(unHashPass: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(unHashPass, salt);
}

export function comparePasswords(unHashPass: string, hashPass: string) {
  return bcrypt.compareSync(unHashPass, hashPass);
}
