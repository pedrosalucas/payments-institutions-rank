const URL_PATH =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://payments-institutions-rank.vercel.app";

export async function getData(ano: number, periodo: number) {
  const response = await fetch(`${URL_PATH}/api/getdata/${ano}/${periodo}`);
  const data = await response.json();
  return data;
}
