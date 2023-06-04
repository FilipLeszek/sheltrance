import { comparePasswords, hashPassword } from "../passwd-utils";

test("hash passwords and compare", () => {
  const passwd = "hahaha";
  const hash = hashPassword(passwd);
  const resultFalse = comparePasswords("dasdaxdawfasefawsedfw", hash);
  const resultTrue = comparePasswords(passwd, hash);
  expect(resultFalse).toBeFalsy();
  expect(resultTrue).toBeTruthy();
});
