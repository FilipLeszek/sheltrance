import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type WorkerInfo = {
  firstName: String,
  lastName: String
}
type Messages = {
  id:number,
  date: Date,
  candidateContactInfo: string,
  worker: WorkerInfo | null,
}

type ResponseData = {
  data?: Messages[];
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
  
  const prisma = new PrismaClient();

  try {
    const messages = await prisma.message.findMany({
      select: {
        id: true,
        date: true,
        petId: false,
        petName: false,
        candidateFirstName: false,
        candidateLastName: false,
        candidateContactInfo: true,
        worker: {
          select:{
            firstName : true,
            lastName : true
          }
        },
        workerId: false,
        message: false
      },
      
    });

    return res.status(200).json({data: messages});
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
