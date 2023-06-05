import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { parseDataFromReq } from "@/lib/api-utils";
import { hashPassword } from "@/lib/passwd-utils";

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

  const { id, firstName, lastName, email, phoneNumber, password } = await parseDataFromReq(req);
  let data;
  if(password){
    data = {password: hashPassword(password)}
  } else {
    data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    }
  }


  try {if (session?.user?.shelterId && session.user?.role == "manager"){
      const user = await prisma.appUser.update({
        data: data,
        where: {
          id: id
        }
      });
      return res.status(200).json({data: "OK"});
    } else {
      return res.status(401).json({error: "Unauthorized"});
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
