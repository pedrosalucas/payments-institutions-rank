import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tb_reclamacao_cliente_por_if[]>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 4 (sem filtragem)
	const data: tb_reclamacao_cliente_por_if[] = await prisma.$queryRaw`
		SELECT nm_instituicao_financeira, qtd_clientes_ccs_scr, ds_ano, ds_trimestre, vl_indice
		FROM tb_reclamacao_cliente_por_if
		WHERE qtd_clientes_ccs_scr IS NOT NULL
		ORDER BY qtd_clientes_ccs_scr DESC
		LIMIT 50;
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
