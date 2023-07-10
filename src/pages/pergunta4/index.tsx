import { Text } from "@geist-ui/core";
import { Spacer } from '@nextui-org/react'
import Select from "react-select";
import { useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import styles from '@/styles/Perguntas.module.css'
import Pergunta4Table from "@/components/perguntas/pergunta4/tabela";
import { getResposta4 } from "@/services/perguntas_v2";

export default function Pergunta4 () {
  const [data, setData] = useState<tb_reclamacao_cliente_por_if[]>([]);
  const options = [];

  for (let ano = 2017; ano <= 2023; ano++) {
    for (let trimestre = 1; trimestre <= 4; trimestre++) {
      const opcao = {
        value: `${ano}.${trimestre}`,
        label: `${ano}.${trimestre}`
      };
      options.push(opcao);
    }
  }

  const handleChange = async (opcaoSelecionada: any) => {
    const [ano, trimestre] = opcaoSelecionada.value.split('.');
    const newData = await getResposta4(parseInt(ano), parseInt(trimestre));
    setData(newData);
  };

  return (
    <div>
      <Text h1 style={{ letterSpacing: '0.6px' }}>
        Selecione o trimestre
      </Text>
      
      <Spacer y={0.5}/>
      <main className={styles.expandprior}>
        <div className={styles.main} style={{ height: "30vh" }}>
          <Select
            options={options}
            onChange={handleChange}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: 'black',
                color: 'white',
              }),
              input: (provided) => ({
                ...provided,
                color: 'white'
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: 'white',
                backgroundColor: 'black'
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'white'
              })
            }}
          />

          <Spacer y={1}/>

          <div className={styles.flexmid}>
            <Pergunta4Table data={data !== undefined ? data : null} />
            <div>
              <Text marginLeft={2} width={40} font="18px" h2>
                <Text>
                  Nesta análise, buscamos investigar se há uma possível relação entre o tamanho de uma instituição financeira e o seu índice de reclamações em um trimestre específico. Para isso, consideramos o tamanho como uma métrica relacionada ao número de clientes da instituição, permitindo-nos avaliar se instituições maiores tendem a apresentar índices de reclamações diferentes das instituições menores.
                </Text>
                <br/>
                <Text >
                  Os resultados apresentados na tabela fornecem informações valiosas para responder a essa pergunta. Eles mostram o índice de reclamações de cada instituição financeira, juntamente com a quantidade de clientes CCS/SCR (Cadastro de Clientes do Sistema Financeiro Nacional e Sistema de Informações de Crédito) que a instituição possui no mesmo trimestre.
                </Text>
                <br/>
                <Text>
                   Ao analisar esses dados, você poderá identificar possíveis correlações ou padrões entre o tamanho da instituição, representado pela quantidade de clientes CCS/SCR, e o seu índice de reclamações. Essa análise pode fornecer insights relevantes sobre como o tamanho de uma instituição financeira pode influenciar a quantidade de reclamações recebidas.
                </Text>
                <br/>
                <Text >
                   É importante ressaltar que os resultados apresentados são baseados em dados reais e atualizados, e eles podem ajudar a entender melhor a dinâmica entre o tamanho da instituição e o índice de reclamações. No entanto, é necessário interpretar os resultados com cautela, considerando outros fatores que possam influenciar o índice de reclamações, como qualidade do atendimento ao cliente, serviços oferecidos, entre outros.
                </Text> 
              </Text>
          </div>
          </div>
        </div>
      </main>
    </div>
  )
}