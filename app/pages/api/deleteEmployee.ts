import { parseDataFromReq } from "@/lib/api-utils";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

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

  const {id } = await parseDataFromReq(req);

  const prisma = new PrismaClient();

  try {
    const user = await prisma.appUser.delete({
      where: {
        id: id
      }
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
  return res.status(200).json({data: "Employee has been deleted."});
}
