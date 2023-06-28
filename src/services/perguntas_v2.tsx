const URL_PATH = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : 'http://www.payments-institutions-rank.vercel.app';

export async function getResposta3(nm_banco:string){
	const response = await fetch(`${URL_PATH}/api/v2/pergunta3/${nm_banco}`);
	const data = await response.json();
	return data;
}

export async function getResposta4(ano:number, trimestre:number){
	const response = await fetch(`${URL_PATH}/api/v2/pergunta4/${ano + '/'}${trimestre}`);
	const data = await response.json();
	return data;
}

export async function getResposta6(nm_banco:string){
	const response = await fetch(`${URL_PATH}/api/v2/pergunta6/${nm_banco}`);
	const data = await response.json();
	return data;
}

export async function getResposta8(ano:number){
	const response = await fetch(`${URL_PATH}/api/v2/pergunta8/${ano}`);
	const data = await response.json();
	return data;
}

export async function getResposta9(ano:number){
	const response = await fetch(`${URL_PATH}/api/v2/pergunta9/${ano}`);
	const data = await response.json();
	return data;
}