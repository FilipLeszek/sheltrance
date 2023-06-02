import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Stage = {

}

export type Adoption = {
  id: number;
  animalName: string;
  clientName: string;
  clientSurname: string;
  clientContact: string;
  stages: Stage[];
  assignedWorker: object;
  isFinished: Boolean;
  createdAt: string;
}

export type ResponseData = {
  data?: Adoption;
  error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
  // 405 - wrong method
  // 400 - database error

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Bad method." });
  }

  const { id } = req.query;
  const prisma = new PrismaClient();

  try {
    const adoption = await prisma.adoption.findFirst({
      where: {
        id: 1
      },
      select: {
        id: true,
        animalName: true,
        clientName: true,
        clientSurname: true,
        clientContact: true,
        stages: true,
        assignedWorker: true,
        isFinished: true,
        createdAt: true
      }
    })
    return res.status(200).json({data: adoption as unknown as Adoption});
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
