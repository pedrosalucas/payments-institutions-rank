import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css';
import { getResposta } from "@/services/perguntas_v1";
import { useState, useEffect } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta2Table from "@/components/perguntas/pergunta2/tabela";
import { Loading } from '@nextui-org/react'; // Importe o componente Loading do @nextui-org/react

export default function Pergunta2() {
  const [data, setData] = useState<tb_reclamacao_cliente_por_if[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  useEffect(() => {
    async function respostaPergunta2() {
      try {
        const response = await getResposta(2);
        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Defina isLoading como falso depois que os dados forem carregados (com sucesso ou erro)
      }
    }

    respostaPergunta2();
  }, []);

  return (
    <div className={styles.grid}>

      <div className={styles.flexmid}>
        <Text marginBottom="2vh" h1 style={{ letterSpacing: '0.6px' }}>
          <Text span>Resultados</Text>
        </Text>
      </div>

      <div className={styles.flexmid}>
        {isLoading ? (
          <Loading size="xl" color="white" textColor="white">Carregando</Loading>
        ) : (
          <div>
            <Pergunta2Table data={data} />
            <div>
            
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
