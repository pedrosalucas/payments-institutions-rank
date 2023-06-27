import { prisma } from '@/db'; //Prisma global instance

export async function populaBancos() {
	const data = await prisma.$queryRaw`
		SELECT nm_instituicao_financeira AS value,  nm_instituicao_financeira AS label 
		FROM tb_reclamacao_cliente_por_if
		GROUP BY nm_instituicao_financeira
		ORDER BY nm_instituicao_financeira;
	`;
	return data;
}
