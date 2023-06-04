import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";


type EmployeeInfo = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  
export type ResponseData = {
  data?: EmployeeInfo;
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
    if (session?.user?.shelterId) {
        const appUser = await prisma.appUser.findFirst({
            where: {
                id: Number(id),
                shelterId: session.user.shelterId 
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
            }
        })
        return res.status(200).json({data: appUser as unknown as EmployeeInfo});
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
