import { decode, encode, passphrase } from "@/lib/AESencode";
import { MailerSheltrance } from "@/lib/Mailer";
import { parseDataFromReq } from "@/lib/api-utils";
import { hashPassword } from "@/lib/passwd-utils";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "GET":
      await handleGetReq(req, res);
      break;
    case "POST":
      await handlePostReq(req, res);
      break;
    default:
      res.status(400).send({ error: "Wrong method." });
      break;
  }
}

async function handleGetReq(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prisma = new PrismaClient();

  try {
    const { addr } = req.query;

    if (!addr || typeof addr === "object") {
      return res.status(400).send({ error: "Wrong addr argument." });
    }

    const foundUser = await prisma.appUser.findFirst({
      where: { email: addr },
    });

    if (!foundUser) {
      return res.status(400).send({ error: "User not found" });
    }

    const encodedUserId = encode(foundUser.id.toString(), passphrase);

    const resetLink = `http://54.37.136.158:3000/reset-password/${encodedUserId}`;
    const resetLinkLocalhost = `http://localhost:3000/reset-password/${encodedUserId}`;

    const mailer = new MailerSheltrance();
    await mailer.sendPassResetHref(addr, resetLink, resetLinkLocalhost);

    res.status(200).send({});
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  } finally {
    await prisma.$disconnect();
  }
}

async function handlePostReq(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prisma = new PrismaClient();

  try {
    const { encodedUid, newPasswd } = await parseDataFromReq(req);

    if (!encodedUid || !newPasswd) {
      res.status(400).send({ error: "Wrong request body." });
    }

    const hashedNewPasswd = hashPassword(newPasswd);
    const uid = Number(decode(encodedUid, passphrase));

    await prisma.appUser.update({
      data: { password: hashedNewPasswd },
      where: { id: uid },
    });

    res.status(200).send({});
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  } finally {
    await prisma.$disconnect();
  }
}
