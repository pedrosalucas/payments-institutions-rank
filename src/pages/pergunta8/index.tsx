import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import { useEffect, useState } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Pergunta8Table from "@/components/perguntas/pergunta8/tabela";
import Select from "react-select";
import {Spacer} from "@nextui-org/react"
import { getResposta as getRespostaV1 } from "@/services/perguntas_v1";
import { getResposta8 as getRespostaV2 } from "@/services/perguntas_v2";

export default function Pergunta8Page({ initialData }: { initialData: tb_reclamacao_cliente_por_if[] }) {
  const [data, setData] = useState<tb_reclamacao_cliente_por_if[]>(initialData);
  const options = [];

  for (let ano = 2017; ano <= 2023; ano++) {
    options.push({ value: ano, label: String(ano) });
  }

  useEffect(() => {
    async function respostaPergunta8() {
      const response = await getRespostaV1(8);
      setData(response);
    }

    respostaPergunta8();
  }, []);

  const handleChange = async (opcaoSelecionada: any) => {
    const newData = await getRespostaV2(opcaoSelecionada.value);
    setData(newData);
  };

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
        </div>
      </div>
    </div>
  )
}
