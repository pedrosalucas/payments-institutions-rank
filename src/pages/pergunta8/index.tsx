import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import { useEffect, useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta8Table from "@/components/perguntas/pergunta8/tabela";
import Select from "react-select";
import {Spacer} from "@nextui-org/react"
import { getResposta as getRespostaV1 } from "@/services/perguntas_v1";
import { getResposta8 as getRespostaV2 } from "@/services/perguntas_v2";
import { useSession } from "next-auth/react";
import UnauthorizedMessage from "@/components/UnauthorizedMessage";

export default function Pergunta8Page() {
  const { data: session } = useSession();
  const [data, setData] = useState<tb_reclamacao_cliente_por_if[]>([]);
  const options = [];

  for (let ano = 2017; ano <= 2023; ano++) {
    options.push({ value: ano, label: String(ano) });
  }

  async function respostaPergunta8() {
    const response = await getRespostaV1(8);
    setData(response);
  }

  const handleChange = async (opcaoSelecionada: any) => {
    const newData = await getRespostaV2(opcaoSelecionada.value);
    setData(newData);
  };

  if(!session) { return (<UnauthorizedMessage/>); }

  respostaPergunta8();

  return (
    <div>
      <Text h1 style={{ letterSpacing: '0.6px' }}>
        Selecione um ano...
      </Text>

      <Spacer y={1}/>

      <div>
        <Select
          options={options}
          onChange={handleChange}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles, backgroundColor: 'black',
              color: 'white',
            }),
            input: (provided) => ({ ...provided, color: 'white' }),
            option: (baseStyles, state) => ({
              ...baseStyles, color: 'white',
              backgroundColor: 'black'
            }),
            singleValue: (provided) => ({ ...provided, color: 'white' })
          }}
        />

        <Spacer y={2}/>

        <div className={styles.flexmid}>
          <Pergunta8Table data={data} />
          <div>
              <Text marginLeft={2} width={40} font="18px" h2>
                <Text>
                Nesta análise, destacamos as 10 empresas que se destacam pelo maior número de reclamações reguladas procedentes e, ao mesmo tempo, pelo menor número de reclamações não reguladas em determinado ano. Com base em dados detalhados e atualizados, examinamos o desempenho dessas empresas em relação à resolução de reclamações reguladas e não reguladas.
                </Text>
                <br/>
                <Text >
                Ao analisar essas informações, podemos identificar as empresas que estão efetivamente resolvendo as reclamações reguladas de seus clientes de forma satisfatória, enquanto apresentam um menor número de reclamações não reguladas. Isso demonstra o compromisso dessas empresas em garantir um serviço de qualidade e uma experiência positiva para seus clientes.
                </Text>
                <br/>
                <Text>
                Essa análise é valiosa para avaliar o desempenho e a reputação das empresas em relação ao tratamento das reclamações dos consumidores. Ao identificar as empresas com os melhores resultados em termos de reclamações reguladas procedentes e baixo número de reclamações não reguladas, você terá uma base sólida para tomar decisões financeiras mais informadas e confiantes.
                </Text>
                <br/>
                <Text >
                A tabela ao lado apresenta as 10 empresas que se destacam pelo maior número de reclamações reguladas procedentes e pelo menor número de reclamações não reguladas em determinado ano. Esses resultados fornecem uma visão clara das empresas que estão fazendo um trabalho efetivo em lidar com as reclamações de seus clientes.
                </Text> 
              </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
