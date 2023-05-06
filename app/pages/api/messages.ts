import { parseDataFromReq } from "@/lib/api-utils";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Messages = {
    id: number,
    date: string,
    candidate: string,
    worker: string
}

type ResponseData = {
  data?: Messages[];
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


  return res.status(200).json({data: [
    {
      id: 1234, 
      date: "17.03.2023", 
      candidate: "jan.kowalski@gmail.com", 
      worker: "Jan Kowalski"
    },
    {
      id: 1235, 
      date: "17.03.2023", 
      candidate: "jan2.kowalski@gmail.com", 
      worker: "Jan Kowalski"
    },
    {
      id: 1236, 
      date: "17.03.2023", 
      candidate: "jan3.kowalski@gmail.com", 
      worker: "Marek Kowalski"
    }]
  });
}
