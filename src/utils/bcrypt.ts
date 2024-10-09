import * as bcrypt from "bcrypt";

async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
}
