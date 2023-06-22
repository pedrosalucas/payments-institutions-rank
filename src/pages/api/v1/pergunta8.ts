import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_irregularidade_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_irregularidade_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 8 (sem filtragem)
	const data: tb_irregularidade_por_if[] = await prisma.$queryRaw`
		SELECT
			nm_instituicao_financeira,
			qtd_reclamacoes_reguladas_procedentes,
			qtd_reclamacoes_nao_reguladas
		FROM
			tb_irregularidade_por_if
		WHERE
			ds_trimestre = '1º'
			AND ds_ano = 2023
		ORDER BY
			qtd_reclamacoes_reguladas_procedentes DESC,
			qtd_reclamacoes_nao_reguladas ASC
		LIMIT 1;
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
