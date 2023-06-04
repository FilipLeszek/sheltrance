import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

type ShelterInfo = {
  name: string | undefined;
  address: string | undefined;
  employeeCount: number;
  openCases: number;
  closedCases: number;
};

type ResponseData = {
  data?: ShelterInfo | null;
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

  try { if (session){
      let shelterDesc = await prisma.shelter.findFirst({
        where: {
          id: session?.user?.shelterId
        },
        select: {
          name: true,
          address: true,
        }
      });
      let empCount = await prisma.appUser.count({
        where: {
          shelterId: session?.user?.shelterId
        }
      });
      let openCases = await prisma.adoption.count({
        where: {
          isFinished: true,
          shelterId: session?.user?.shelterId
        }
      });
      let closedCases = await prisma.adoption.count({
        where: {
          isFinished: false,
          shelterId: session?.user?.shelterId
        }
      });
      const shelter : ShelterInfo = {
        name: shelterDesc?.name,
        address: shelterDesc?.address,
        employeeCount: empCount,
        openCases: openCases,
        closedCases: closedCases,
      }
      return res.status(200).json({data: shelter});
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
