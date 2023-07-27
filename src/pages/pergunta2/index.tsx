import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css';
import { getResposta } from "@/services/perguntas_v1";
import { useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta2Table from "@/components/perguntas/pergunta2/tabela";
import UnauthorizedMessage from "@/components/UnauthorizedMessage";
import { useSession } from "next-auth/react";
import { Loading } from '@nextui-org/react'; 
  
export default function Pergunta2() {
  const { data: session } = useSession();
  const [data, setData] = useState<tb_reclamacao_cliente_por_if[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function respostaPergunta2() {
    try {
      const response = await getResposta(2);
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if(!session) { return (<UnauthorizedMessage/>); }

  respostaPergunta2();

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
              <Text marginLeft={2} width={40} font="18px" h2>
                <Text>
                  Nesta análise, investigamos a variação do índice de reclamações ao longo do tempo para as cinco instituições financeiras que possuem o maior número de clientes. Com base em dados atualizados e detalhados, analisamos como essas instituições lidaram com as reclamações recebidas ao longo de vários trimestres.
                </Text>
                <br/>
                <Text >
                  Através de um acompanhamento minucioso, podemos identificar tendências e padrões no comportamento do índice de reclamações dessas instituições ao longo do tempo. Comparamos os valores trimestrais para entender se houve uma melhora ou piora nas taxas de reclamações, permitindo que você obtenha uma visão mais abrangente sobre o desempenho das instituições financeiras líderes do setor.
                </Text>
                <br/>
                <Text>
                  Essa análise nos ajuda a compreender como as instituições financeiras estão lidando com as necessidades e expectativas dos clientes ao longo do tempo. Ao conhecer a variação do índice de reclamações, é possível tomar decisões mais informadas sobre as melhores opções para suas necessidades financeiras.
                </Text>
                <br/>
                <Text >
                  Os resultados apresentados nesta tabela revelam as flutuações do índice de reclamações ao longo do tempo para as cinco instituições financeiras de destaque em termos de número de clientes. Essas informações são valiosas para avaliar o desempenho e a qualidade do serviço prestado por essas instituições, permitindo que você tome decisões financeiras mais embasadas e seguras.
                </Text> 
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
