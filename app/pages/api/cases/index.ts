import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {CaseInfo} from "@/pages/cases";
import {PrismaClient} from "@prisma/client";

type ResponseData = {
  data?: CaseInfo[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // 405 - wrong method
  // 400 - database error

  const prisma = new PrismaClient();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    try {
      const cases = await prisma.adoption.findMany({
        where: {
          shelterId: session?.user?.shelterId
        },
        select: {
          id: true,
          clientName: true,
          createdAt: true,
          assignedWorker: true,
          isFinished: true
        }
      });
      return res.status(200).json({data: cases});
    } catch (error: any) {
      return res.status(400).json({error: error.message});
    } finally {
      await prisma.$disconnect();
    }
  }
  else if(req.method === "POST") {
    const {
      animalId,
      clientName,
      clientSurname,
      clientContact,
      animalName,
    } = req.body;
    try {
      await prisma.adoption.create({
            data: {
              animalId: animalId,
              animalName: animalName,
              clientName: clientName,
              clientSurname: clientSurname,
              clientContact: clientContact,
              stages: {
                create: [
                  {
                    description: "",
                    name: "",
                    dateFinished: "",
                  },
                  {
                    description: "",
                    name: "",
                    dateFinished: "",
                  },
                  {
                    description: "",
                    name: "",
                    dateFinished: "",
                  },
                  {
                    description: "",
                    name: "",
                    dateFinished: "",
                  },
                ],
              },
              isFinished: false,
              shelterId: session?.user?.shelterId,
              userId: session?.user?.id || 1
            }
          }
      );
      res.status(200).end();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  }
  else return res.status(405).json({ error: "Bad method." });
}
