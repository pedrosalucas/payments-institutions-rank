import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db"; //Prisma global instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = JSON.parse(req.body); //usar essa linha caso esteja testando a API com o app
  //const requestBody = req.body; //usar essa linha caso esteja testando a API com o Postman
  let data: number = 0;

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
    console.log(error);
    res.status(400).json({ message: "Bad request." });
  }
  if (data > 0) {
    res.status(200).json({ message: "Success." });
  } else {
    res.status(400).json({
      message:
        "You need to wait until it is possible to update the access information.",
    });
  }
}
