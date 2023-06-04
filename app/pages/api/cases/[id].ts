import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

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
  const { method } = req;
  const { id } = req.query;
  const prisma = new PrismaClient();

  switch (method) {
    case "GET":
      try {
        const adoption = await prisma.adoption.findFirst({
          where: {
            id: 1
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
        fourthStepComment
      } = req.body;

      // tutaj save prisma


      res.status(200);
      break;
    case "POST":
      // TUTAJ trzeba utworzyc sprawe na bazie
      //   prisma.adoption.create({
      //     data: {
      //
      //     }
      //       }
      //
      //   )
      res.status(200);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }




}
