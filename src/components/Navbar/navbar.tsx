import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { Text, Link } from "@geist-ui/core";
import { Spacer } from "@nextui-org/react"
import LoginButton from "../loginButton/loginButton";

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
          
            <LoginButton/>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
