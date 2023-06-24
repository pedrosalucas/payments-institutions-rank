import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_reclamacao_cliente_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 10 (sem filtragem)
	const data: tb_reclamacao_cliente_por_if[] = await prisma.$queryRaw`
		SELECT DISTINCT ON (ds_ano, ds_trimestre)
			ds_ano,
			ds_trimestre,
			nm_instituicao_financeira,
			qtd_total_reclamacoes
		FROM
			tb_reclamacao_cliente_por_if
		ORDER BY
			ds_ano,
			ds_trimestre,
			qtd_total_reclamacoes DESC;
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
