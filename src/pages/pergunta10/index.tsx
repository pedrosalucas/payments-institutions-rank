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
        <div>
              <Text marginLeft={2} width={40} font="18px" h2>
                <Text>
                Nesta análise, destacamos as instituições financeiras que apresentam o maior número absoluto de reclamações em cada período de referência. Com base em dados detalhados e atualizados, examinamos o desempenho dessas instituições em relação à quantidade total de reclamações recebidas.
                </Text>
                <br/>
                <Text >
                Ao analisar essas informações, podemos identificar as instituições financeiras que estão recebendo um grande volume de reclamações, permitindo uma comparação entre elas. Essa análise revela as instituições que enfrentam um maior número de desafios no atendimento e na satisfação dos clientes.
                </Text>
                <br/>
                <Text>
                Essa análise é valiosa para entender quais instituições financeiras estão lidando com um grande volume de reclamações em cada período de referência. Essas informações ajudam a avaliar a reputação e o desempenho dessas instituições, oferecendo uma base sólida para tomar decisões financeiras mais informadas.
                </Text>
                <br/>
                <Text >
                A tabela ao lado apresenta as instituições financeiras com o maior número absoluto de reclamações em cada período de referência. Esses resultados fornecem uma visão clara das instituições que estão recebendo um volume considerável de reclamações e podem exigir uma análise mais aprofundada sobre a qualidade do serviço oferecido.
                </Text> 
              </Text>
          </div>
      </div>
  </div>
  )
}
