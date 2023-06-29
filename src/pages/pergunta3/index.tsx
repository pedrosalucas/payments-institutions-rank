import { Grid, Text } from "@geist-ui/core";
import { getResposta3 } from "@/services/perguntas_v2";
import { useState, useEffect } from "react";
import { tb_reclamacao_cliente_por_if } from "@prisma/client";
import { getBancos } from "@/services/getBancos";
import { Spacer } from "@nextui-org/react";
import styles from '@/styles/Perguntas.module.css'
import Select from "react-select";

  export default function Pergunta3() {
	const [data, setData] = useState<tb_reclamacao_cliente_por_if[]>([]);
	const [options, setOptions] = useState([]);
	const [bancoSelected, setBancoSelected] = useState("");

	useEffect(() => {
		async function populaBancos() {
			const bancos: any = await getBancos();
			setOptions(bancos);
		}

		populaBancos();
	}, []);

	useEffect(() => {
		async function queryPergunta3(nm_banco: string) {
			const data = await getResposta3(nm_banco);
			setData(data);
		}

		if (bancoSelected !== "")
			queryPergunta3(bancoSelected) ;
	}, [bancoSelected]);

	//função alterada visando a correção do onChange dentro do <Select/>
	const handleChange = (newValue: any| null) => {
		if (newValue !== null) {
			const { value } = newValue as { value: string; label: string };
			setBancoSelected(value);
		}
	};

	const inst_name = () => {
		if (data !== undefined && data.length !== 0) 
			return `O(a) ${data[0].nm_instituicao_financeira} tem o total de:`
		
		return "";
	}

	const complaint_amount = () => {
		if (data !== undefined && data.length !== 0) 
			return `${data[0].qtd_total_reclamacoes} reclamações`
		
		return "";
	}

	return (
		<main className={styles.wrapper}>
			<div>
				<Grid.Container gap={2}>
				<Grid>
					<Text h1 style={{ letterSpacing: '0.6px' }}>
					<Text span>Selecione um banco...</Text>
					</Text>
				</Grid>
				</Grid.Container>
				<div>
					<main>
						<div className={styles.main} style={{ height: "30vh" }}>
						<Spacer y={1} />
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

						<div>
							<Spacer y={1} />
							<h1>{inst_name()}</h1>
							<h2>{complaint_amount()}</h2>
						</div>
						</div>
					</main>
				</div>
			</div>
		</main>
	);
}
