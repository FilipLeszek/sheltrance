import { PrismaClient, TempEmployee } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type EmployeeInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type ResponseData = {
  data?: EmployeeInfo[];
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

  const prisma = new PrismaClient();

  try {
    const employees = await prisma.tempEmployee.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      }
    });
    return res.status(200).json({data: employees});
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
