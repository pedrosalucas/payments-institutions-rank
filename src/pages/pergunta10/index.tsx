import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import { getResposta } from "@/services/perguntas_v1";
import { useEffect, useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta10Table from "@/components/perguntas/pergunta10/tabela";
import { Spacer } from '@nextui-org/react'


export default function Pergunta10 () {
  const [data, setData] =  useState<tb_reclamacao_cliente_por_if[]>([]);
  
  useEffect(() => {
    async function respostaPergunta10() {
      const response = await getResposta(10);
      setData(response);
    }

    respostaPergunta10();
  }, []);

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
