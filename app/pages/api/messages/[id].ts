import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

type WorkerInfo = {
  firstName: string,
  lastName: string,
  email: string,
}

type Message = {
  id:number,
  date: Date,
  petName: string,
  candidateFirstName: string,
  candidateLastName: string,
  candidateContactInfo: string,
  isFinished: boolean,
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
  const session = await getServerSession(req, res, authOptions)

  try {
    if(session?.user?.shelterId) {
      const message = await prisma.message.findFirst({
        where: {
          id: Number(id),
          shelterId: session.user.shelterId
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
              email: true,
              firstName : true,
              lastName : true
            }
          },
          isFinished: true,
          workerId: false,
          message: true,
          shelter:false,
          shelterId: false,
        }
      })
      return res.status(200).json({data: message as Message});
    } else {
      return res.status(401).json({ error: "Unauthorized"});
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}