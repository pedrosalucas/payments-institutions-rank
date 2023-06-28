import { Text } from "@geist-ui/core";
import { Spacer } from '@nextui-org/react'
import Select from "react-select";
import { useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import styles from '@/styles/Perguntas.module.css'
import Pergunta4Table from "@/components/perguntas/pergunta4/tabela";
import { getResposta4 } from "@/services/perguntas_v2";



export async function getStaticProps(){
  const data = await getResposta4(2017, 1); // Carrega os dados iniciais
  return {
      props: {
          initialData: data
      }
  }
}

export default function Pergunta4 ( {initialData}: {initialData:tb_reclamacao_cliente_por_if[]} ) {
  const [data, setData] = useState(initialData);
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

  const handleChange = async (opcaoSelecionada) => {
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
        </div>
      </div>
      </main>
    </div>
  )
}