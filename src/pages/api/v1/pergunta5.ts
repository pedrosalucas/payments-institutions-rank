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
		WITH cte_anos AS (
			SELECT DISTINCT ds_ano
			FROM tb_reclamacao_cliente_por_if
			WHERE vl_indice IS NOT NULL
		)
		SELECT
				atual.nm_instituicao_financeira,
				REPLACE(REPLACE(atual.vl_indice, ',', ''), '.', '')::numeric - REPLACE(REPLACE(anterior.vl_indice, ',', ''), '.', '')::numeric AS reducao_indice
		FROM
				tb_reclamacao_cliente_por_if atual
				INNER JOIN tb_reclamacao_cliente_por_if anterior ON atual.nm_instituicao_financeira = anterior.nm_instituicao_financeira
						AND atual.ds_ano = anterior.ds_ano + 1
		WHERE
				atual.ds_ano = 2022
				AND atual.vl_indice IS NOT NULL
				AND anterior.vl_indice IS NOT NULL
		ORDER BY
				reducao_indice DESC;
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
