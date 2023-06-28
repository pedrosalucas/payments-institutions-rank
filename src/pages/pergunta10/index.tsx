import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import { getResposta } from "@/services/perguntas_v1";
import { useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta10Table from "@/components/perguntas/pergunta10/tabela";
import { Spacer } from '@nextui-org/react'


export async function getStaticProps(){
  const data = await getResposta(10);
  return {
      props: {
          initialData: data
      }
  }
}

export default function Pergunta10 ( {initialData}: {initialData:tb_reclamacao_cliente_por_if[]} ) {
  const [data, setData] =  useState<tb_reclamacao_cliente_por_if[]>(initialData);
  

  return(
    <div>
      <div className={styles.flexmid}>
        <Text h1 style={{ letterSpacing: '0.6px' }}>
          Resultados
        </Text>
      </div>

      <Spacer y={0.5}/>

      <div className={styles.flexmid}>
        <Pergunta10Table data={data}/>
      </div>
  </div>
  )
}
