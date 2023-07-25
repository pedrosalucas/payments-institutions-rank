'use client'

import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { Text, Link, Button } from "@geist-ui/core";
import { Spacer } from "@nextui-org/react"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("Session:", session);
  console.log("Status:", status);

  return (
    <header className={` ${inter.className}`}>
      <div className={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/">
            <Text b i font="30px" style={{ letterSpacing: "0.6px" }}>
              PIR
            </Text>
          </Link>
          <Spacer x={2}/>
          <Link href="/about">
            <Text> Sobre Nós</Text>
          </Link>
        </div>

        <div>
          {session ? (
            <>
              <Text b>Osvaldo</Text>
              <Button onClick={() => signOut()}>
                Sair
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push('/login')}>
              Login
            </Button>
          )} 
        </div>
      </div>
    </header>
  );
};

export default Navbar;
