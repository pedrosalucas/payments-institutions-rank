import { Grid, Text} from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import Pergunta1Chart from "@/components/perguntas/pergunta1/grafico";
import { getResposta } from "@/services/perguntas_v1";
import { useState, useEffect } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import { Spacer, Loading } from '@nextui-org/react'

export default function Pergunta1() {
  const [data, setData] = useState<tb_reclamacao_cliente_por_if[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    async function respostaPergunta1() {
      try {
        const response = await getResposta(1);
        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); 
      }
    }

    respostaPergunta1();
  }, []);

  return (
    <div>
      <Grid.Container gap={2}>
        <Grid>
          <Text h1 style={{ letterSpacing: '0.6px' }}>
            <Text span>
              Aqui estão as instituições financeiras com o maior índice de reclamações em cada período de referência
            </Text>
          </Text>

        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <div className={styles.flexmid}>
      {isLoading ? ( 
        <Loading size="xl" color="white" textColor="white">Carregando</Loading>
      ) : (
        <div >
          <Pergunta1Chart data={data} />
        </div>
      )}
      </div>
    </div>
  );
}
