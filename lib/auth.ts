import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProvider({
      name: "signin",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if(!credentials.email || !credentials.password){
          return null;
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if(!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return { id: user.id, email: user.email, randomKey: "Random Key!" };
      }
    })
  ],
  callbacks: {
    session: ({session, token}) => {
      return {
        ...session, user: {
          ...session.user, id: token.id, randomKey: token.randomKey
        }
      };
    },
    jwt: ({token, user }) => {
      if(user) {
        const u = user as unknown as any;

        return {...token, id: u.id, randomKey: u.randomKey };
      }

      return token;
    }
  }
}
