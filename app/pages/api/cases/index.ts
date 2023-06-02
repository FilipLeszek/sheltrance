import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {CaseInfo} from "@/pages/cases";

type ResponseData = {
  data?: CaseInfo[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // 405 - wrong method
  // 400 - database error

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Bad method." });
  }
  const session = await getServerSession(req, res, authOptions)

  const prisma = new PrismaClient();

  try {
    const cases = await prisma.adoption.findMany({
      where: {
        shelterId: session?.user?.shelterId
      },
      select: {
        id: true,
        clientName: true,
        createdAt: true,
        assignedWorker: true,
        isFinished: true
      }
    });
    return res.status(200).json({data: cases});
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
