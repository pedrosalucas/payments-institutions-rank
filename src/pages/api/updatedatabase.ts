import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db"; //Prisma global instance
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;
  const new_data = req.body;
  var inserts: Prisma.BatchPayload = { count: 0 };

  if (new_data.length > 0) {
    inserts = await prisma.tb_irregularidade_por_if.createMany({
      data: new_data,
      skipDuplicates: true,
    });
  }

  var resp;
  if (inserts.count > 0) {
    resp = { status: 200, message: "Database Updated." };
  } else {
    resp = { status: 400, message: "Database has not been updated." };
  }

  switch (requestMethod) {
    case "GET":
      res.status(400).json({ status: 400, message: "Method not allowed." });
      break;
    case "POST":
      res.status(resp.status).json(resp);
      break;
    default:
      break;
  }
}

export const config = {
  api: {
    responseLimit: false,
    // responseLimit: '8mb',
  },
};
