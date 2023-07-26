import bcrypt from 'bcryptjs';
import { prisma } from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body as {
        email: string, password: string
      };
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          password: hashedPassword,
          email: email.toLocaleLowerCase()
        }
      });
  
      return res.status(200).json({ user: { email: user.email } });
  
    } catch (err: any) {
      console.error(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return res.status(422).json({ status: "error", error: "Já exite um usuário com esses dados." });
        }
      } else {
        return res.status(500).json({ status: "error", error: err.message });
      }
    }
  } else {
    return res.status(405).json({ status: "error", error: "Method not allowed" });
  }
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}
