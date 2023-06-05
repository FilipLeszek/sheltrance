import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { parseDataFromReq } from "@/lib/api-utils";

type ShelterInfo = {
  name: string | undefined;
  address: string | undefined;
  employeeCount: number;
  openCases: number;
  closedCases: number;
};

type ResponseData = {
  data?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // 405 - wrong method
  // 400 - database error

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Bad method." });
  }
  const session = await getServerSession(req, res, authOptions)

  const prisma = new PrismaClient();

  const { name, address } = await parseDataFromReq(req);

  try {if(session?.user?.shelterId && session.user?.role == "manager"){
    let shelterDesc = await prisma.shelter.update({
      data: {
        name: name,
        address: address,
      },
      where: {
        id: session?.user?.shelterId
      },
    });
    return res.status(200).json({data: "OK"});
  } else {
    return res.status(401).json({data: "Unauthorized"});
  }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
