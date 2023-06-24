import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_reclamacao_cliente_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 2 (sem filtragem)
	const data: tb_reclamacao_cliente_por_if[] = await prisma.$queryRaw`
		SELECT ds_ano, ds_trimestre, nm_instituicao_financeira, vl_indice
		FROM tb_reclamacao_cliente_por_if
		WHERE nm_instituicao_financeira IN (
				SELECT nm_instituicao_financeira
				FROM tb_reclamacao_cliente_por_if
				GROUP BY nm_instituicao_financeira
				HAVING COUNT(*) >= 4 -- Valor que define o mínimo de trimestres em que a instituição aparece em todas as tabelas
		)
		ORDER BY nm_instituicao_financeira, ds_ano, ds_trimestre;
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
