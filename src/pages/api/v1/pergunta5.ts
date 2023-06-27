import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_reclamacao_cliente_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 5 (sem filtragem)
	const data: tb_reclamacao_cliente_por_if[] = await prisma.$queryRaw`
		WITH tb_reclamacoes_por_ano AS (
			SELECT nm_instituicao_financeira, ds_ano, sum(REPLACE(REPLACE(vl_indice, ',', ''), '.', '')::numeric) total_indice
			FROM tb_reclamacao_cliente_por_if
			WHERE vl_indice IS NOT NULL AND (ds_ano = 2022 OR ds_ano = 2022 + 1)
			GROUP BY nm_instituicao_financeira, ds_ano
		)
		SELECT
			atual.nm_instituicao_financeira,
			(atual.total_indice - anterior.total_indice)::text AS vl_indice
		FROM
			(SELECT * FROM tb_reclamacoes_por_ano WHERE ds_ano = 2022) atual
			INNER JOIN (SELECT * FROM tb_reclamacoes_por_ano WHERE ds_ano = 2022 + 1) anterior ON atual.nm_instituicao_financeira = anterior.nm_instituicao_financeira
		ORDER BY (atual.total_indice - anterior.total_indice) DESC;
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
