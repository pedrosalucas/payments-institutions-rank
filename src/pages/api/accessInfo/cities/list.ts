import { prisma } from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<{ nm_cidade: string }[] | null>
) {
  if (req.method === 'GET') {
    const { country, state } = req.query as { country: string, state: string };

    const data: { nm_cidade: string }[] | null = await prisma.$queryRaw`
    SELECT nm_cidade
    FROM tb_historico_acesso
    WHERE nm_pais = ${country} and nm_estado = ${state}
    GROUP BY nm_cidade
    ORDER BY nm_cidade desc
    `;

    return res.status(200).json(data);
  } else {
    return res.status(405);
  }
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { country: string; state: string; };
}
