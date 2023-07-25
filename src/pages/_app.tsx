import Navbar from '@/components/Navbar/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['vietnamese'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>  
      <Navbar/>
      <main className={`${styles.main} ${inter.className}`}>
        <Component {...pageProps} /> 
      </main>
    </SessionProvider>
  )
}
