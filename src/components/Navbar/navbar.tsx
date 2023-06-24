import { Avatar, User } from "@geist-ui/core";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { Text, Link } from "@geist-ui/core";

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
          <Link href="/about">
            <Text marginLeft={2}> Sobre Nós</Text>
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
