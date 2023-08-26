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

  var updateTbHistoricoAtualizacao: number = 0;

  if (inserts.count > 0) {
    updateTbHistoricoAtualizacao = await prisma.$executeRaw`
			UPDATE tb_historico_atualizacao
			SET nr_trimestre = (CASE WHEN nr_trimestre = 4 THEN 1 ELSE nr_trimestre + 1 END),
			nr_ano = (CASE WHEN nr_trimestre = 4 THEN nr_ano + 1 ELSE nr_ano END),
			dt_atualizacao = now();
		`;
  }

  var resp;
  if (inserts.count > 0 && updateTbHistoricoAtualizacao > 0) {
    resp = { status: 200, message: "Database Updated." };
  } else {
    resp = { status: 400, message: "Database has not been updated." };
  }

  switch (requestMethod) {
    case "GET":
      break;
    case "POST":
      res.status(resp.status).json(resp);
      break;
    default:
      break;
  }
}
