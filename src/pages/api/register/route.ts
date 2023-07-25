import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/db';
import { NextApiRequest } from 'next';

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextResponse
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
  
      return NextResponse.json({ user: { email: user.email } });
  
    } catch (err: any) {
      return new NextResponse(
        JSON.stringify({ status: "error", error: err.message }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ status: "error", error: "Method not allowed" }),
      { status: 405 }
    );
  }
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}
