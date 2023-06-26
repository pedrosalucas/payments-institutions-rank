import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_irregularidade_por_if, tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_irregularidade_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 9 (sem filtragem)
	const data: tb_irregularidade_por_if[] = await prisma.$queryRaw`
	SELECT
		nm_instituicao_financeira,
		ds_irregularidade,
		qtd_reclamacoes_nao_reguladas,
		qtd_total_reclamacoes
		
	FROM
		tb_irregularidade_por_if
	WHERE
		ds_ano = 2021 AND
		ds_trimestre = '1º' AND
		qtd_total_reclamacoes >= 500
	ORDER BY
		(qtd_reclamacoes_nao_reguladas::float / qtd_total_reclamacoes) DESC
	LIMIT 15;
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
