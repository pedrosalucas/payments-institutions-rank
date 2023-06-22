import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_reclamacao_cliente_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 6 (sem filtragem)
	const data: tb_reclamacao_cliente_por_if[] = await prisma.$queryRaw`
		SELECT
			qtd_clientes_ccs_scr,
			vl_indice
		FROM
			tb_reclamacao_cliente_por_if
		WHERE
			qtd_clientes_ccs_scr IS NOT NULL
			AND vl_indice IS NOT NULL;
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
