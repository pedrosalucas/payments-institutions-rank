import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import { getResposta } from "@/services/perguntas_v1";
import { useState, useEffect } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta2Table from "@/components/perguntas/pergunta2/tabela";

export default function Pergunta2 () {
  const [data, setData] =  useState<tb_reclamacao_cliente_por_if[]>([]);
  
  useEffect(() => {
    async function respostaPergunta2() {
      const response = await getResposta(2);
      setData(response);
    }

    respostaPergunta2();
  }, []);

  return(
    <div className={styles.grid}>
      <Grid.Container gap={2} className={styles.grid}>
        <Grid>
        <Text margin="2vh" h1 style={{ letterSpacing: '0.6px' }}>
          <Text span >Resultados</Text>
        </Text>
          
        </Grid>
      </Grid.Container>

      <div className={styles.flexleft}>
        <Pergunta2Table data={data}/>
      </div>
  </div>
  )
}
