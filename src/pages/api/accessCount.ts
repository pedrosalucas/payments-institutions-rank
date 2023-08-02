import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const requestMethod = req.method;

	switch (requestMethod) {
		case 'GET':
            const response = await fetch('https://api.api-ninjas.com/v1/counter?id=payment_rank&hit=true', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': `${process.env.GET_NINJA_API_KEY}`
                },
            });
            const data = await response.json();
			res.status(200).json(data);
			break;
		default:
            return res.status(405).json({ status: "error", error: "Method not allowed" });
			break;
	}
}
