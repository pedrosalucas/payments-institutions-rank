import { Grid, Text } from "@geist-ui/core";
import Pergunta1 from "@/components/perguntas/pergunta1/tabela";
import styles from '@/styles/Perguntas.module.css'
import Pergunta1Chart from "@/components/perguntas/pergunta1/grafico";
import { getResposta } from "@/services/perguntas_v1";
import { useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta2 from "@/components/perguntas/pergunta2/tabela";


export async function getStaticProps(){
  const data = await getResposta(3);
  return {
      props: {
          initialData: data
      }
  }
}

export default function pergunta2 ( {initialData}: {initialData:tb_reclamacao_cliente_por_if[]} ) {
  const [data, setData] =  useState<tb_reclamacao_cliente_por_if[]>(initialData);
  

  return(
    <div className={styles.grid}>
      <Grid.Container gap={2} className={styles.grid}>
        <Grid>
        <Text margin="2vh" h1 style={{ letterSpacing: '0.6px' }}>
          <Text span >Resultados</Text>
        </Text>
          
        </Grid>
      </Grid.Container>
      <div >
      <main className={styles.main}>
        {data.map((c: any, i: number) => (
					<div key={i}>
            <h1>C6 BANK (conglomerado)</h1>
						<h2>- {c.total_reclamacoes} reclamações</h2>
					</div>
				))}
      </main>
      </div>
      {/*<Pergunta1Chart data={data}/>*/}
      
  </div>

  )
}