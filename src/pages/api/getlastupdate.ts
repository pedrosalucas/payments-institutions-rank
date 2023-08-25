import type { NextApiRequest, NextApiResponse } from "next";
import { tb_historico_atualizacao } from "@prisma/client"; //data type
import { prisma } from "@/db"; //Prisma global instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_historico_atualizacao>
) {
  const requestMethod = req.method;

  var data: tb_historico_atualizacao;
  data = await prisma.$queryRaw`
		SELECT id, nr_ano, dt_atualizacao, nr_trimestre
		FROM tb_historico_atualizacao
		ORDER BY dt_atualizacao DESC
		LIMIT 1;
	`;

  switch (requestMethod) {
    case "GET":
      res.status(200).json(data);
      break;
    case "POST":
      break;
    default:
      break;
  }
}
