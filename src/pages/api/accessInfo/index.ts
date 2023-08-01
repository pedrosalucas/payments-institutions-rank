import type { NextApiRequest, NextApiResponse } from "next";
import { tb_historico_acesso } from "@prisma/client"; //data type
import { prisma } from "@/db"; //Prisma global instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_historico_acesso[]>
) {
  const requestMethod = req.method;

  //Consulta geral que agrupa pela tripla (cidade, estado e país)
  const data: tb_historico_acesso[] = await prisma.$queryRaw`
		SELECT
			nm_cidade, nm_estado, nm_pais, sum(cont_acessos) total_acessos
		FROM
			tb_historico_acesso
		GROUP BY 
			nm_cidade, nm_estado, nm_pais
		ORDER BY
			total_acessos desc
	`;

  switch (requestMethod) {
    case "GET":
      res.status(200).json(data);
      break;
    default:
      res.status(405).json([{ message: "Method not allowed." }]);
      break;
  }
}
