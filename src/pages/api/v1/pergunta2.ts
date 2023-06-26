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
	WHERE ds_categoria IN ('Top 10', 'Mais de quatro milhões de clientes', 'Top 15 - Bancos, Financeiras e Instituições de Pagamento')
		AND nm_instituicao_financeira IN (
			SELECT nm_instituicao_financeira
			FROM tb_reclamacao_cliente_por_if
			WHERE ds_categoria IN ('Top 10', 'Mais de quatro milhões de clientes', 'Top 15 - Bancos, Financeiras e Instituições de Pagamento')
			GROUP BY nm_instituicao_financeira
			HAVING COUNT(*) = (
				SELECT COUNT(*)
				FROM tb_reclamacao_cliente_por_if
				WHERE ds_categoria IN ('Top 10', 'Mais de quatro milhões de clientes', 'Top 15 - Bancos, Financeiras e Instituições de Pagamento')
				GROUP BY nm_instituicao_financeira
				ORDER BY COUNT(*) DESC
				LIMIT 1
			)
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
