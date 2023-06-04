import { parseDataFromReq } from "@/lib/api-utils";
import { hashPassword } from "@/lib/passwd-utils";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // 405 - wrong method
  // 400 - database error

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Bad method." });
  }

  const { email, password, name, address, firstName, lastName, phoneNumber } =
    await parseDataFromReq(req);

  const hashedPassword = await hashPassword(password);

  const prisma = new PrismaClient();

  try {
    const shelter = await prisma.shelter.create({
      data: {
        address: address,
        name: name,
      },
    });
    const user = await prisma.appUser.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        role: "manager",
        shelterId: shelter.id,
      },
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
  return res.status(200).json({ data: "User has been added." });
}
