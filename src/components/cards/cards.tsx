import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Cards () {
    const router = useRouter()

    return (

        <div className={styles.grid}>
          <a
            href="#" className={styles.card}
            onClick={() => router.push('/pergunta1')}
          >
            <h2>
              Pergunta 1 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
            Quais são as instituições financeiras com o maior índice de reclamações em cada período de referência?
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
            onClick={() => router.push('/pergunta2')}
          >
            <h2>
              Pergunta 2 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
            Qual é a variação do índice de reclamações ao longo do tempo para as 5 instituições financeiras com o maior número de clientes?
            </p>
          </a>

          <a
             href="#"
             className={styles.card}
             onClick={() => router.push('/pergunta3')}
          >
            <h2>
              Pergunta 3 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
              Quantas reclamações o(a) [instituição/banco] obteve em todo o período de tempo?
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
            onClick={() => router.push('/pergunta4')}
          >
            <h2>
              Pergunta 4 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
              Existe alguma relação entre o tamanho do(a) [instituição/banco] (número de clientes, por exemplo) e o seu índice de reclamações em determinado trimestre?
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
            onClick={() => router.push('/pergunta5')}
          >
            <h2>
              Pergunta 5 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
             Quais são as 10 [instituições financeiras/bancos] que apresentaram a maior redução no índice de reclamações em relação ao ano anterior?
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
            onClick={() => router.push('/pergunta6')}
          >
            <h2>
              Pergunta 6 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
              Qual relação entre a quantidade de clientes [CCS/SCR] e o índice de reclamações de um(a) determinado(a) [banco/instituição financeira]?
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
            onClick={() => router.push('/pergunta7')}
          >
            <h2>
              Pergunta 7 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
              Qual a relação entre um banco/instituição estar no “Top 15 - Bancos, Financeiras e Instituições de Pagamento” e o seu número de reclamações em determinado período?
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
            onClick={() => router.push('/pergunta8')}
          >
            <h2>
              Pergunta 8 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
            Quais as 10 empresas que apresentam o maior número de reclamações reguladas procedentes e o menor número de reclamações não reguladas em determinado ano?
            </p>
          </a>
          
          <a
            href="#"
            className={styles.card}
            onClick={() => router.push('/pergunta9')}
          >
            <h2>
              Pergunta 9 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
              Quais as 10 empresas com maior número de reclamações não reguladas em relação a quantidade de reclamações em determinado ano?
            </p>
          </a>

          <a
            href="#"
            className={styles.card}
            onClick={() => router.push('/pergunta10')}
          >
            <h2>
              Pergunta 10 <span>-&gt;</span>
            </h2>
            <p style={{textAlign:'justify'}}>
              Quais são as 10 instituições financeiras com o maior número absoluto de reclamações em cada período de referência?
            </p>
          </a>
        </div>

    )
}