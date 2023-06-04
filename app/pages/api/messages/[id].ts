import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type WorkerInfo = {
  firstName: string,
  lastName: string
}

type Message = {
  id:number,
  date: Date,
  petName: string,
  candidateFirstName: string,
  candidateLastName: string,
  candidateContactInfo: string,
  worker: WorkerInfo | null,
  message: string
}
  
type ResponseData = {
  data?: Message;
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
    const message = await prisma.message.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        date: true,
        petId: false,
        petName: true,
        candidateFirstName: true,
        candidateLastName: true,
        candidateContactInfo: true,
        worker: {
          select:{
            firstName : true,
            lastName : true
          }
        },
        workerId: false,
        message: true
      }
    })
    return res.status(200).json({data: message as Message});
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}