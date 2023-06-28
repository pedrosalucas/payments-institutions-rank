import { Grid, Text } from "@geist-ui/core";
import styles from '@/styles/Perguntas.module.css'
import { getResposta3 } from "@/services/perguntas_v2";
import { useState, useEffect } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Select from "react-select";
import {populaBancos} from "@/services/populaBancos";
import { Spacer } from "@nextui-org/react";


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

export default function Pergunta3 ( {initialData, bancos}: {initialData:tb_reclamacao_cliente_por_if[], bancos:any} ) {
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
	<main className={styles.wrapper}>
    <div>
      <Grid.Container gap={2} >
        <Grid>
        <Text  h1 style={{ letterSpacing: '0.6px' }}>
          <Text span >Selecione um banco...</Text>
        </Text>
          
        </Grid>
      </Grid.Container>
      <div>
		<main >
			<div className={styles.main} style={{height:"30vh"}}>
				<Spacer y={1}/>
				<Select options={options} onChange={handleChange} styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							backgroundColor:'black',
							color: 'white',
						}),
						input: (provided) => ({
							...provided,
							color:'white'
						})
						,
						option: (baseStyles, state) => ({
							...baseStyles,
							color: 'white',
							backgroundColor: 'black'
						}),
						singleValue: (provided) => ({
							...provided,
							color:'white'
						})
					}}/>

				<div>
					<Spacer y={1}/>
					<h1>
						{data !== undefined? `O ${data[0].nm_instituicao_financeira} tem o total de:`: ""}
					</h1>
					<h2>
						{data !== undefined? `${data[0].qtd_total_reclamacoes} reclamações` : ""}
					</h2>
				</div>
			</div>
		</main>
      </div>
      
  </div>
  </main>
  )
}
