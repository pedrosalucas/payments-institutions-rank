import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import { useEffect, useState } from "react";
import { tb_irregularidade_por_if } from "@prisma/client";
import Pergunta9Table from "@/components/perguntas/pergunta9/tabela";
import { getResposta } from "@/services/perguntas_v1";
import Select from "react-select";
import { getResposta9 } from "@/services/perguntas_v2";
import { Spacer } from "@nextui-org/react";

export default function Pergunta9Page() {
  const [data, setData] = useState<tb_irregularidade_por_if[]>([]);
  const options = [];

  for (let ano = 2017; ano <= 2023; ano++) {
    options.push({ value: ano, label: String(ano) });
  }

  useEffect(() => {
    async function respostaPergunta9() {
      const response = await getResposta(9);
      setData(response);
    }

    respostaPergunta9();
  }, []);

  const handleChange = async (opcaoSelecionada : any) => {
    const newData = await getResposta9(opcaoSelecionada.value);
    setData(newData);
  };

  return (
    <div >
          
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
            <Pergunta9Table data={data} />
            <div>
              <Text marginLeft={2} width={40} font="18px" h2>
                <Text>
                Nesta análise, destacamos as 10 empresas que apresentam o maior número de reclamações não reguladas em relação à quantidade total de reclamações recebidas em determinado ano. Com base em dados detalhados e atualizados, examinamos o desempenho dessas empresas em relação às reclamações não reguladas.
                </Text>
                <br/>
                <Text >
                Ao analisar essas informações, podemos identificar as empresas que estão enfrentando um desafio específico em relação às reclamações não reguladas. Essas reclamações podem abranger aspectos não regulamentados do setor financeiro, exigindo uma análise mais detalhada para identificar as áreas que precisam ser melhoradas.
                </Text>
                <br/>
                <Text>
                Essa análise é valiosa para entender quais empresas estão enfrentando uma maior quantidade de reclamações não reguladas em relação ao total de reclamações recebidas. Isso permite que você avalie como essas empresas estão lidando com essas reclamações e tome decisões informadas ao selecionar suas instituições financeiras.
                </Text>
                <br/>
                <Text >
                A tabela ao lado destaca as 10 empresas com o maior número de reclamações não reguladas em relação à quantidade total de reclamações em determinado ano. Esses resultados fornecem uma visão clara das empresas que estão enfrentando um desafio nessa área específica e podem exigir atenção para melhorar a qualidade do serviço oferecido.
                </Text> 
              </Text>
          </div>
          </div>
        </div>
      </div>

  )
}
