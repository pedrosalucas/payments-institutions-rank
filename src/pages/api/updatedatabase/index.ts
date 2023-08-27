import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db"; //Prisma global instance
import { Prisma, tb_historico_atualizacao } from "@prisma/client";
import { getData } from "@/services/lastdata";
import { getNextTrimestre } from "@/services/getlastupdate";
import { updateHistorico } from "@/services/updatehistorico";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;

  const periodo: tb_historico_atualizacao = await getNextTrimestre();
  const new_data = await getData(periodo.nr_ano, periodo.nr_trimestre);

  var inserts: Prisma.BatchPayload = { count: 0 };

  if (new_data.length > 0) {
    inserts = await prisma.tb_irregularidade_por_if.createMany({
      data: new_data,
      skipDuplicates: true,
    });
  }

  var resp;
  if (inserts.count > 0) {
    resp = await updateHistorico();
  } else {
    resp = { status: 400, message: "Database has not been updated." };
  }

  switch (requestMethod) {
    case "GET":
      res.status(resp.status).json(resp);
      break;
    case "POST":
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
