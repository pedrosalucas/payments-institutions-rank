import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db"; //Prisma global instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;

  var data: number = 0;
  data = await prisma.$executeRaw`
		UPDATE tb_historico_atualizacao
		SET nr_trimestre = (CASE WHEN nr_trimestre = 4 THEN 1 ELSE (CASE WHEN nr_ano = 2022 AND nr_trimestre = 1 THEN 3 ELSE nr_trimestre + 1 END) END),
		nr_ano = (CASE WHEN nr_trimestre = 4 THEN nr_ano + 1 ELSE nr_ano END),
		dt_atualizacao = now();
	`;

  switch (requestMethod) {
    case "GET":
      if (data > 0)
        res.status(200).json({ status: 200, message: "Database updated." });
      else {
        res
          .status(400)
          .json({ status: 400, message: "Historico has not been updated." });
      }
      break;
    case "POST":
      break;
    default:
      break;
  }
}
