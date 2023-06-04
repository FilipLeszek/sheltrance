import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

type Stage = {

}

export type Adoption = {
  id: number;
  animalName: string;
  clientName: string;
  clientSurname: string;
  clientContact: string;
  stages: Stage[];
  assignedWorker: any;
  isFinished: Boolean;
  createdAt: string;
}

export type ResponseData = {
  data?: Adoption;
  error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
  const { method, query } = req;
  const prisma = new PrismaClient();
  const session = await getServerSession(req, res, authOptions);

  switch (method) {
    case "GET":
      try {
        if (!query.id) {
          return res.status(400).json({ error: error.message });
        }
          const adoption = await prisma.adoption.findFirst({
            where: {
              id: parseInt(<string>query.id || '')
            },
            select: {
              id: true,
              animalName: true,
              clientName: true,
              clientSurname: true,
              clientContact: true,
              stages: true,
              assignedWorker: true,
              isFinished: true,
              createdAt: true
            }
          })
          return res.status(200).json({data: adoption as unknown as Adoption});
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      } finally {
        await prisma.$disconnect();
      }
      break;
    case "PUT":
      const {
        firstStepDate,
        firstStepFinish,
        firstStepComment,
        secondStepDate,
        secondStepFinish,
        secondStepComment,
        thirdStepDate,
        thirdStepFinish,
        thirdStepComment,
        fourthStepDate,
        fourthStepFinish,
        fourthStepComment,
        firstStageId,
        secondStageId,
        thirdStageId,
        fourthStageId,
        id
      } = req.body;

      await prisma.adoption.update({
        where : {
          id: id,
          shelterId: session?.user?.id,
        },
        data: {
          stages: {
            update:
                {
                  where: {
                    id: firstStageId,
                  },
                  data: {
                    description: firstStepComment,
                    dateFinished: firstStepDate,
                    isFinished: firstStepFinish
                  }
                }
          }
        }
      });

      await prisma.adoption.update({
        where : {
          id: id,
          shelterId: session?.user?.id,
        },
        data: {
          stages: {
            update: {
              where: {
                id: secondStageId,
              },
              data: {
                description: secondStepComment,
                dateFinished: secondStepDate,
                isFinished: secondStepFinish
              }
            }
          }
        }
      });

      await prisma.adoption.update({
        where : {
          id: id,
          shelterId: session?.user?.id,
        },
        data: {
          stages: {
            update: {
              where: {
                id: thirdStageId,
              },
              data: {
                description: thirdStepComment,
                dateFinished: thirdStepDate,
                isFinished: thirdStepFinish
              }
            }
          }
        }
      });
      await prisma.adoption.update({
        where : {
          id: id,
          shelterId: session?.user?.id,
        },
        data: {
          stages: {
            update: {
              where: {
                id: fourthStageId,
              },
              data: {
                description: fourthStepComment,
                dateFinished: fourthStepDate,
                isFinished: fourthStepFinish
              }
            }

          }
        }
      });

      return res.status(200).end('ok');
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }




}
