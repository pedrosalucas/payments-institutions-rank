const URL_PATH = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : 'https://payments-institutions-rank.vercel.app';

export async function getBancos(){
	const response = await fetch(`${URL_PATH}/api/v2/possiveisBancos`);
	const data = await response.json();
	return data;
}
