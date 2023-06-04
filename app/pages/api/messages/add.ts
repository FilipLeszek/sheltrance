import { parseDataFromReq } from "@/lib/api-utils";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

type Message = {
    petId: number,
    petName: string,
    candidateFirstName: string
    candidateLastName: string
    candidateContactInfo: String
    message: string
}

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

  const {petId, petName, candidateFirstName, candidateLastName, candidateContactInfo, message} = await parseDataFromReq(req);
  const session = await getServerSession(req, res, authOptions)

  const prisma = new PrismaClient();

  try {
    const user = await prisma.message.create({
      data: {
        petId: petId,
        petName: petName,
        candidateFirstName: candidateFirstName,
        candidateLastName: candidateLastName,
        candidateContactInfo: candidateContactInfo,
        message: message,
      },
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
  return res.status(200).json({data: "Employee has been added."});
}
