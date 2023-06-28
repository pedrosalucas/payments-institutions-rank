import { Avatar, User } from "@geist-ui/core";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { Text, Link } from "@geist-ui/core";
import { Spacer } from "@nextui-org/react"

const inter = Inter({ subsets: ["latin"] });

const Navbar = () => {

  return (
    <main className={` ${inter.className}`}>
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
            <Text b>Osvaldo</Text>
            
        </div>
      </div>
    </main>
  );
};

export default Navbar;
