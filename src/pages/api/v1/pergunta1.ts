import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_reclamacao_cliente_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 1 (sem filtragem)
	const data: tb_reclamacao_cliente_por_if[] = await prisma.$queryRaw`
		SELECT ds_ano, ds_trimestre, nm_instituicao_financeira, vl_indice
		FROM tb_reclamacao_cliente_por_if AS t1
		WHERE vl_indice = (
				SELECT MAX(vl_indice)
				FROM tb_reclamacao_cliente_por_if AS t2
				WHERE t1.ds_ano = t2.ds_ano AND t1.ds_trimestre = t2.ds_trimestre
		)
		ORDER BY ds_ano, ds_trimestre;
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
