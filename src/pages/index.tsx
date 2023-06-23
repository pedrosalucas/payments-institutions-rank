import Head from 'next/head'
import { Text, Button, Note, Grid, Card} from '@geist-ui/core'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import About from './about'


const inter = Inter({ subsets: ['vietnamese'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Payments Institutions Rank</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>	
        
        <div className={styles.container}>
          <Text h1>As instituições financeiras agora, mais transparentes</Text>
          <br></br>
          <Text h2 width={"60%"}> Tenha uma visão abrangente do ranking de instituições financeiras com base em diversos fatores. Informações valiosas sobre a reputação e o desempenho das instituições financeiras, permite que você tome decisões informadas ao escolher um parceiro financeiro.</Text>
          
        </div>
        
      </main>	
      <div className={styles.appcontainer}>
        <div className={styles.modules}>
          <table>oi</table>
        </div>
        
      </div>
      
    </>
  )
}