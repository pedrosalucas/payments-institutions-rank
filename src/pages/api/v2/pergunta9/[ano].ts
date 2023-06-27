import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_irregularidade_por_if, tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_reclamacao_cliente_por_if[]>
) {
	const requestMethod = req.method;
	const {ano} = req.query;
	//Consulta Pergunta 9 (sem filtragem)
	const data: tb_reclamacao_cliente_por_if[] = await prisma.$queryRaw`
		SELECT
			nm_instituicao_financeira,
			SUM(qtd_reclamacoes_nao_reguladas)::integer AS qtd_reclamacoes_nao_reguladas,
			SUM(qtd_total_reclamacoes)::integer AS qtd_total_reclamacoes,
			(SUM(qtd_reclamacoes_nao_reguladas::float) / SUM(qtd_total_reclamacoes))::text AS vl_indice
		FROM
			tb_irregularidade_por_if
		WHERE
			qtd_total_reclamacoes >= 500 AND
			ds_ano = ${ano}::integer
		GROUP BY 
			nm_instituicao_financeira
		ORDER BY
			(SUM(qtd_reclamacoes_nao_reguladas::float) / SUM(qtd_total_reclamacoes)) DESC
		LIMIT 10;
	`;

	switch (requestMethod) {
		case 'GET':
			res.status(200).json(data);
			break;
		case 'POST':
			res.status(200).json([]);
			break;
		default:
			break;
	}
}
