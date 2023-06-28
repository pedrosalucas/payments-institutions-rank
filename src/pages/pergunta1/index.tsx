import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import Pergunta1Chart from "@/components/perguntas/pergunta1/grafico";
import { getResposta } from "@/services/perguntas_v1";
import { useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import { Spacer } from '@nextui-org/react'


export async function getStaticProps(){
  const data = await getResposta(1);
  return {
      props: {
          initialData: data
      }
  }
}

export default function Pergunta1 ( {initialData}: {initialData:tb_reclamacao_cliente_por_if[]} ) {
  const [data, setData] =  useState<tb_reclamacao_cliente_por_if[]>(initialData);

  return(
    <div >
      <Grid.Container gap={2} >
        <Grid>
        <Text h1 style={{ letterSpacing: '0.6px' }}>
          <Text span >
            Aqui estão as instituições financeiras com o maior índice de reclamações em cada período de referência
          </Text>
        </Text>
          
        </Grid>
      </Grid.Container>
      <Spacer y={1}/>
      <div className={styles.flexmid}>
        <Pergunta1Chart data={data}/>
      </div>
  </div>

  )
}
