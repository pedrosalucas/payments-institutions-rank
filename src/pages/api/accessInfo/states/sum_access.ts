import { prisma } from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<{ cont_acessos: string }[] | null>
) {
  if (req.method === 'GET') {
    const { country, state } = req.query as {
      country:string, state: string
    };

    const data: { cont_acessos: string }[] | null = await prisma.$queryRaw`
    SELECT sum(cont_acessos) as cont_acessos
    FROM tb_historico_acesso
    WHERE nm_pais = ${country} and nm_estado = ${state}
    `;

    return res.status(200).json(data);
  } else {
    return res.status(405);
  }
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { country: string; state: string; };
}
