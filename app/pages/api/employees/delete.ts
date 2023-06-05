import { parseDataFromReq } from "@/lib/api-utils";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";


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

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Bad method." });
  }
  
  const session = await getServerSession(req, res, authOptions);

  const {id } = await parseDataFromReq(req);

  const prisma = new PrismaClient();

  try {if (session && session.user?.role == "manager"){
    const user = await prisma.appUser.delete({
      where: {
        id: id
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
  return res.status(200).json({data: "Employee has been deleted."});
}
