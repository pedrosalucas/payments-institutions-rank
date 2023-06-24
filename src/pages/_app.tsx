import Navbar from '@/components/Navbar/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

/*
*/

const inter = Inter({ subsets: ['vietnamese'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    
    <Navbar/>
    <main className={`${styles.main} ${inter.className}`}>
    <Component {...pageProps} />
    </main>
    </>
  )
}
