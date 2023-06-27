import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import Pergunta1Chart from "@/components/perguntas/pergunta1/grafico";
import { getResposta3 } from "@/services/perguntas_v2";
import { useState, useEffect } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Select from "react-select";
import {populaBancos} from "@/services/populaBancos";


export async function getStaticProps(){
  //const data = await getResposta3();
	const bancos = await populaBancos();
  return {
      props: {
          //initialData: data,
					bancos: bancos
      }
  }
}

export default function pergunta3 ( {initialData, bancos}: {initialData:tb_reclamacao_cliente_por_if[], bancos:any} ) {
  const [data, setData] =  useState<tb_reclamacao_cliente_por_if[]>();
  const [options, setOptions] =  useState(bancos);
	const [bancoSelected, setBancoSelected] = useState("");

	const handleChange = ({value, label}: {value:string, label: string}) => {
		setBancoSelected(value);
	};

	async function queryPergunta3(nm_banco:string) {
		const data = await getResposta3(nm_banco);
		 setData(data);
	}

	useEffect(() =>{
		queryPergunta3(bancoSelected);
	}, [bancoSelected, data])
	
  return(
    <div className={styles.grid}>
      <Grid.Container gap={2} className={styles.grid}>
        <Grid>
        <Text margin="2vh" h1 style={{ letterSpacing: '0.6px' }}>
          <Text span >Resultados</Text>
        </Text>
          
        </Grid>
      </Grid.Container>
      <div>
				<main className={styles.main} style={{height: '90vh'}}>
				<Select options={options} onChange={handleChange} styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							color: 'black',
							
						}),
						option: (baseStyles, state) => ({
							...baseStyles,
							color: 'black',
						})
					}}/>
					<div>
						<h1>{data !== undefined? data[0].nm_instituicao_financeira : ""}</h1>
						<h2>{data !== undefined? data[0].qtd_total_reclamacoes : ""} reclamações</h2>
					</div>
					
				</main>
      </div>
      {/*<Pergunta1Chart data={data}/>*/}
      
  </div>

  )
}