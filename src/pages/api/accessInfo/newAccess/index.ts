import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db"; //Prisma global instance

const INTERVAL_FOR_STORE_ACCESS_INFO =
  process.env.NODE_ENV !== "production" ? false : true;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = req.body;
  let data: number = 0;

  if (INTERVAL_FOR_STORE_ACCESS_INFO) {
    //script para produção
    try {
      data = await prisma.$executeRaw`
			INSERT INTO tb_historico_acesso(ip_acesso, nm_cidade, nm_estado, nm_pais) VALUES 
				(${requestBody.ip_acesso}, ${requestBody.nm_cidade}, ${requestBody.nm_estado}, ${requestBody.nm_pais}) 
			ON CONFLICT(ip_acesso) DO UPDATE 
				SET 
					cont_acessos = 1 + (SELECT ha.cont_acessos FROM tb_historico_acesso ha WHERE ha.ip_acesso = EXCLUDED.ip_acesso), 
					ultima_atualizacao = now() 
				WHERE now() - (SELECT ha.ultima_atualizacao FROM tb_historico_acesso ha WHERE ha.ip_acesso = EXCLUDED.ip_acesso) > interval '1 hour'; 
			`;
    } catch (error) {
      res.status(405).json({ message: "Bad request." });
    }
  } else {
    try {
      // script para desenvolvimento
      data = await prisma.$executeRaw`
			INSERT INTO tb_historico_acesso(ip_acesso, nm_cidade, nm_estado, nm_pais) VALUES 
				(${requestBody.ip_acesso}, ${requestBody.nm_cidade}, ${requestBody.nm_estado}, ${requestBody.nm_pais}) 
			ON CONFLICT(ip_acesso) DO UPDATE 
				SET 
					cont_acessos = 1 + (SELECT ha.cont_acessos FROM tb_historico_acesso ha WHERE ha.ip_acesso = EXCLUDED.ip_acesso), 
					ultima_atualizacao = now() 
				WHERE now() - (SELECT ha.ultima_atualizacao FROM tb_historico_acesso ha WHERE ha.ip_acesso = EXCLUDED.ip_acesso) > interval '1 second'; 
			`;
    } catch (error) {
      res.status(405).json({ message: "Bad request." });
    }
  }

  if (data > 0) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(405).json({
      message:
        "You need to wait until it is possible to update the access information.",
    });
  }
}
