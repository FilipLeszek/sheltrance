import { parseDataFromReq } from "@/lib/api-utils";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type MessageInfo = {
  isFinished?: boolean,
  worker?: {
    connect: {
        email: string
    }
  },
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

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Bad method." });
  }
  
  const { id, isFinished, workerEmail } = await parseDataFromReq(req);
  const prisma = new PrismaClient();
  const session = await getServerSession(req, res, authOptions);

  let data = {} as MessageInfo;
  if(isFinished != null){
    data.isFinished = isFinished;
  }
  if(workerEmail != null) {
    data.worker = {
        connect: {
            email: workerEmail
        }
    }
  }
  try { if(session?.user?.shelterId){
        const message = await prisma.message.update({
            where: {
                id: id
            },
            data: data
        })
        return res.status(200).json({data: "OK"});
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}