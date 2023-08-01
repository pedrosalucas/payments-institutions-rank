import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db"; //Prisma global instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = JSON.parse(req.body);
  let data: number = 0;

  try {
    data = await prisma.$executeRaw`
		INSERT INTO tb_historico_acesso(ip_acesso, nm_cidade, nm_estado, nm_pais) VALUES 
			(${requestBody.ip_acesso}, ${requestBody.nm_cidade}, ${requestBody.nm_estado}, ${requestBody.nm_pais}) 
		ON CONFLICT(ip_acesso) 
		DO UPDATE 
			SET cont_acessos = 1 + (SELECT cont_acessos FROM tb_historico_acesso ha WHERE ha.ip_acesso = EXCLUDED.ip_acesso);
		`;
  } catch (error) {
    res.status(400).json({ message: "Bad request." });
  }
  if (data > 0) {
    res.status(200).json({ message: "Success." });
  }
}
