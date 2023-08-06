const URL_PATH = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000' : 'https://payments-institutions-rank.vercel.app';

export async function register(bodyData: any){
	const response = await fetch(`${URL_PATH}/api/register/route`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bodyData),
	})
	const data = await response.json();
	return data;
}
