import { Grid, Text,} from "@geist-ui/core";
import { Spacer } from "@nextui-org/react"
import styles from '@/styles/Perguntas.module.css'
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import Select from "react-select";
import { getBancos } from "@/services/getBancos";
import Pergunta6Table from "@/components/perguntas/pergunta6/tabela";
import { useState, useEffect } from "react";
import { getResposta6 } from "@/services/perguntas_v2";
  
  export default function Pergunta6() {
	const [data, setData] = useState<tb_reclamacao_cliente_por_if[]>();
	const [options, setOptions] = useState([]);
	const [bancoSelected, setBancoSelected] = useState("");

	useEffect(() => {
		async function populaBancos() {
			const bancos: any = await getBancos();
			setOptions(bancos);
		}

		populaBancos();
	}, []);
  
	const handleChange = (newValue: any | null) => {
	  if (newValue !== null) {
		const { value, label } = newValue as { value: string; label: string };
		setBancoSelected(value);
	  }
	};
  
	async function queryPergunta6(nm_banco: string) {
	  const data = await getResposta6(nm_banco);
	  setData(data);
	}
  
	useEffect(() => {
	  queryPergunta6(bancoSelected);
	}, [bancoSelected, data]);
  
	return (
	  <div>
		<Grid.Container gap={2}>
		  <Grid>
			<Text h1 style={{ letterSpacing: "0.6px" }}>
			  <Text span>Resultados</Text>
			</Text>
		  </Grid>
		</Grid.Container>
		<div>
		  <main className={styles.expandprior}>
			<div className={styles.main} style={{ height: "30vh" }}>
			  <Spacer y={1} />
			  <Select
				options={options}
				onChange={handleChange}
				styles={{
				  control: (baseStyles, state) => ({
					...baseStyles,
					backgroundColor: "black",
					color: "white",
				  }),
				  input: (provided) => ({
					...provided,
					color: "white",
				  }),
				  option: (baseStyles, state) => ({
					...baseStyles,
					color: "white",
					backgroundColor: "black",
				  }),
				  singleValue: (provided) => ({
					...provided,
					color: "white",
				  }),
				}}
			  />
  
			  <div>
				<Spacer y={1} />
			  </div>
  
			  <div className={styles.flexmid}>
				<Pergunta6Table data={data?.length !== 0 ? data : null} />
			  </div>
			</div>
		  </main>
		</div>
	  </div>
	);
  }