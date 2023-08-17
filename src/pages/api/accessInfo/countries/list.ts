import { prisma } from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ nm_pais: string }[] | null>
) {
  if (req.method === 'GET') {
    const data: { nm_pais: string }[] | null = await prisma.$queryRaw`
    SELECT nm_pais
		FROM tb_historico_acesso
		GROUP BY nm_pais
		ORDER BY nm_pais desc
    `;

    return res.status(200).json(data);
  } else {
    return res.status(405);
  }
}
