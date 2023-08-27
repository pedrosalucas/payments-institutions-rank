import type { NextApiRequest, NextApiResponse } from "next";
import { tb_irregularidade_por_if } from "@prisma/client"; //data type
import { prisma } from "@/db"; //Prisma global instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_irregularidade_por_if[]>
) {
  const requestMethod = req.method;
  const { params } = req.query;

  var data: tb_irregularidade_por_if[] = [];

  if (params !== undefined && params?.length == 1) {
    data = await prisma.$queryRaw`
		SELECT ds_ano, ds_trimestre, ds_categoria, tp_instituicao, ds_cnpj_if, nm_instituicao_financeira, 
			ds_irregularidade, qtd_reclamacoes_reguladas_procedentes, qtd_reclamacoes_reguladas_outras, 
			qtd_reclamacoes_nao_reguladas, qtd_total_reclamacoes 
		FROM tb_armengo 
		WHERE ds_ano = ${params[0]}::integer 
	`;
  } else if (params !== undefined && params?.length == 2) {
    data = await prisma.$queryRaw`
			SELECT ds_ano, ds_trimestre, ds_categoria, tp_instituicao, ds_cnpj_if, nm_instituicao_financeira, 
				ds_irregularidade, qtd_reclamacoes_reguladas_procedentes, qtd_reclamacoes_reguladas_outras, 
				qtd_reclamacoes_nao_reguladas, qtd_total_reclamacoes 
			FROM tb_armengo 
			WHERE ds_ano = ${params[0]}::integer 
				AND ds_trimestre = ${params[1]} || 'º'
		`;
  }

  switch (requestMethod) {
    case "GET":
      res.status(200).json(data);
      break;
    case "POST":
      res.status(200).json([]);
      break;
    default:
      break;
  }
}
