import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string[]>
  ) {
      const requestMethod = req.method;
  
      const data: string[] = await prisma.$queryRaw`
        SELECT nm_instituicao_financeira AS value,  nm_instituicao_financeira AS label 
        FROM tb_reclamacao_cliente_por_if
        GROUP BY nm_instituicao_financeira
        ORDER BY nm_instituicao_financeira;
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
