import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Data() {
    return (
    <>
    <div className={styles.description}>
        <h1>Página de Data</h1>
        <Link href="/" >Voltar</Link>
    </div>
    </>
    )
}