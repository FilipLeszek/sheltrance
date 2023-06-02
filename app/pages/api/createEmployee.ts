import { parseDataFromReq } from "@/lib/api-utils";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

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

  const {firstName, lastName,  email, phoneNumber, password } = await parseDataFromReq(req);
  const session = await getServerSession(req, res, authOptions)


  const prisma = new PrismaClient();

  try {if (session?.user?.shelterId){
    const user = await prisma.appUser.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        role: "user",
        shelterId: session?.user?.shelterId,
      },
    });
  }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
  return res.status(200).json({data: "Employee has been added."});
}
