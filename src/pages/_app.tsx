import dynamic from "next/dynamic";
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

  const NavbarWithNoSSR = dynamic(() => import("@/components/Navbar/navbar"), {
    ssr: false
  });

  return (
    <SessionProvider session={session}>  
      <NavbarWithNoSSR />
      <main className={`${styles.main} ${inter.className}`}>
        <Component {...pageProps} /> 
      </main>
    </SessionProvider>
  )
}
