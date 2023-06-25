const URL_PATH = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : 'http://www.pir.vercel.app';

export async function getResposta(id_pergunta:number){
	const response = await fetch(`${URL_PATH}/api/v1/pergunta${id_pergunta}`);
	const data = await response.json();
	return data;
}
