import type { NextApiRequest, NextApiResponse } from 'next'
import {tb_reclamacao_cliente_por_if} from "@prisma/client"; //data type
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
	const requestMethod = req.method;

	//Consulta Pergunta 3 (sem filtragem)
	const data:number = await prisma.$queryRaw`
		SELECT SUM(qtd_total_reclamacoes)::int AS total_reclamacoes
		FROM tb_reclamacao_cliente_por_if
		WHERE nm_instituicao_financeira = 'C6 BANK (conglomerado)'
				AND ds_ano = 2022
				AND ds_trimestre = '1º';
	`;

	switch (requestMethod) {
		case 'GET':
			res.status(200).json(data);
			break;
		case 'POST':
			res.status(200).json(-1);
			break;
		default:
			break;
	}
}
