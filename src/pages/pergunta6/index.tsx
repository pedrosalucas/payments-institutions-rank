import { Grid, Text,} from "@geist-ui/core";
import { Spacer } from "@nextui-org/react";
import styles from '@/styles/Perguntas.module.css';
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
					...baseStyles, backgroundColor: "black",
					color: "white",
				  }),
				  input: (provided) => ({ ...provided, color: "white" }),
				  option: (baseStyles, state) => ({
					...baseStyles, color: "white",
					backgroundColor: "black",
				  }),
				  singleValue: (provided) => ({ ...provided, color: "white" }),
				}}
			  />
  
			  <div>
				<Spacer y={1} />
			  </div>
  
			  <div className={styles.flexmid}>
				<Pergunta6Table data={data?.length !== 0 ? data : null} />
				<div>
					{data !== null && (
						<Text marginLeft={2} width={40} font="18px" h2>
						<Text>
						Nesta análise, investigamos a relação entre a quantidade de clientes registrados nos sistemas CCS (Cadastro de Clientes do Sistema Financeiro Nacional) e SCR (Sistema de Informações de Crédito) e o índice de reclamações de uma instituição financeira específica. Com base em dados detalhados e atualizados, exploramos a possível correlação entre esses dois fatores.
						</Text>
						<br/>
						<Text >
						Ao analisar as informações fornecidas, podemos identificar se existe uma relação entre o tamanho da base de clientes de uma instituição financeira e o seu índice de reclamações. Através dessa análise, podemos entender se instituições com maior número de clientes apresentam índices de reclamações proporcionais ou se há outras variáveis em jogo.
						</Text>
						<br/>
						<Text>
						Essa análise é valiosa para compreender como a quantidade de clientes CCS/SCR de uma instituição financeira pode influenciar a satisfação e a experiência dos clientes, assim como o potencial impacto nas reclamações recebidas. Essa relação pode fornecer insights sobre a qualidade do serviço prestado e a eficácia das práticas de atendimento ao cliente.
						</Text>
						<br/>
						<Text >
						A tabela apresentada ao lado traz informações sobre a relação entre a quantidade de clientes (CCS/SCR) e o índice de reclamações de uma determinada instituição financeira. Esses resultados permitem que você avalie se existe uma relação direta, inversa ou nenhuma relação aparente entre esses dois fatores.
						</Text> 
					</Text>
					)}
				</div>
			  </div>
			</div>
		  </main>
		</div>
	  </div>
	);
  }