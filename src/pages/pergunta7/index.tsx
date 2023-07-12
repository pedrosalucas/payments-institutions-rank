import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import { getResposta } from "@/services/perguntas_v1";
import { useState, useEffect } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta7Table from "@/components/perguntas/pergunta7/tabela";

export default function Pergunta6 () {
  const [data, setData] =  useState<tb_reclamacao_cliente_por_if[]>([]);

  useEffect(() => {
    async function respostaPergunta7() {
      const response = await getResposta(7);
      setData(response);
    }

    respostaPergunta7();
  }, []);

  return(
    <div className={styles.grid}>

        <div className={styles.flexmid}>
        <Text marginBottom="2vh" h1 style={{ letterSpacing: '0.6px' }}>
          <Text span >Resultados</Text>
        </Text>
        </div>  

      
      <div className={styles.flexmid}>
        <Pergunta7Table data={data}/>
        <div>
              <Text marginLeft={2} width={40} font="18px" h2>
                <Text>
                  Nesta análise, destacamos as 40 instituições financeiras que demonstraram uma significativa redução no índice de reclamações em comparação ao ano anterior. Com base em dados abrangentes e atualizados, examinamos o desempenho dessas instituições ao lidar com as reclamações recebidas, destacando aquelas que conseguiram melhorar significativamente a qualidade de seus serviços e atendimento.
                </Text>
                <br/>
                <Text >
                  Ao analisar as informações fornecidas, podemos identificar as instituições financeiras que estão se esforçando para aprimorar suas práticas e abordagens, resultando em uma redução substancial nas reclamações. Essa redução pode refletir melhorias na satisfação do cliente, resolução eficiente de problemas e um maior compromisso em atender às necessidades dos consumidores.
                </Text>
                <br/>
                <Text>
                  Através dessa análise, você poderá identificar as instituições financeiras que estão se destacando na redução do índice de reclamações, mostrando um compromisso com a excelência no atendimento ao cliente e na resolução de problemas. Essas instituições merecem reconhecimento por seus esforços em melhorar continuamente a qualidade de seus serviços.
                </Text>
                <br/>
                <Text >
                  A tabela exibida apresenta as 10 instituições financeiras com a maior redução no índice de reclamações em relação ao ano anterior. Esses resultados permitem que você identifique aquelas instituições que estão realmente fazendo a diferença, oferecendo um ambiente mais confiável e satisfatório para seus clientes.
                </Text> 
              </Text>
          </div>
      </div>
    </div>
  )
}
