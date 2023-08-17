import { prisma } from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<{ nm_estado: string }[] | null>
) {
  console.log(req.body);
  if (req.method === 'GET') {
    const { country } = req.query as { country: string };

    const data: { nm_estado: string }[] | null = await prisma.$queryRaw`
    SELECT nm_estado
    FROM tb_historico_acesso
    WHERE nm_pais = ${country}
    GROUP BY nm_estado
    ORDER BY nm_estado desc
    `;

    return res.status(200).json(data);
  } else {
    return res.status(405);
  }
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { country: string; };
}
