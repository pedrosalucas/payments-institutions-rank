import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_reclamacao_cliente_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 7 (sem filtragem)
	const data: tb_reclamacao_cliente_por_if[] = await prisma.$queryRaw`
		SELECT
			tb.ds_categoria,
			tb.nm_instituicao_financeira,
			tb.qtd_total_reclamacoes
		FROM
			tb_reclamacao_cliente_por_if AS tb
			INNER JOIN (
					SELECT
							nm_instituicao_financeira
					FROM
							tb_reclamacao_cliente_por_if
					WHERE
							ds_trimestre = '1º'
							AND ds_ano = '2022'
							AND ds_categoria = 'Top 15 - Bancos, Financeiras e Instituições de Pagamento'
					LIMIT 15
			) AS top_instituicoes ON tb.nm_instituicao_financeira = top_instituicoes.nm_instituicao_financeira
		WHERE
			tb.ds_trimestre = '1º'
			AND tb.ds_ano = '2022'
		ORDER BY
			tb.qtd_total_reclamacoes DESC;
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
