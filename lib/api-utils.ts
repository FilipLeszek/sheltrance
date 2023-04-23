import { NextApiRequest } from "next";

export async function parseDataFromReq(
  req: NextApiRequest
): Promise<any | string> {
  if (typeof req.body !== "object") return await JSON.parse(req.body);
  return req.body;
}