import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { Text, Link, Button } from "@geist-ui/core";
import { Spacer } from "@nextui-org/react"
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const sessionContextButtons = () => {
    if (session) {
      return (
        <>
          <a className={styles.link} onClick={() => signOut()}>
            Sair
          </a>
        </>
      );
    } else if (pathname != '/login' && pathname != '/register') {
      return (
        <>
          <a
            onClick={() => router.push(`/login?callbackUrl=${pathname}`)}
            className={styles.link}
          >
            Login
          </a>
          <span> </span>
          <a onClick={() => router.push(`/register?callbackUrl=${pathname}`)}
            className={styles.link}
          >
            Cadastro
          </a>
        </>
      );
    }

    return null;
  }

  return (
    <header className={` ${inter.className}`}>
      <div className={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/">
            <Text b i font="30px" style={{ letterSpacing: "0.6px" }}>
              PIR
            </Text>
          </Link>
          <Spacer x={2} />
          <Link href="/about">
            <Text> Sobre Nós</Text>
          </Link>
        </div>

        <div>{sessionContextButtons()}</div>
      </div>
    </header>
  );
};

export default Navbar;
