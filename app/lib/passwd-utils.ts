import bcrypt from "bcrypt";

export function hashPassword(unHashPass: string) {
  return bcrypt.hash(unHashPass, 10).then((result) => result);
}

export function comparePasswords(unHashPass: string, hashPass: string) {
  return bcrypt.compare(unHashPass, hashPass).then((result) => result);
}
