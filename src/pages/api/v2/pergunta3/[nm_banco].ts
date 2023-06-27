import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'; //Prisma global instance


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
	const requestMethod = req.method;
	const { nm_banco } = req.query
	
	//Consulta Pergunta 3 (com filtragem)
	const data:number = await prisma.$queryRaw`
		SELECT nm_instituicao_financeira, SUM(qtd_total_reclamacoes)::int AS qtd_total_reclamacoes
		FROM tb_reclamacao_cliente_por_if
		WHERE nm_instituicao_financeira = ${nm_banco}
		GROUP BY nm_instituicao_financeira;
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
