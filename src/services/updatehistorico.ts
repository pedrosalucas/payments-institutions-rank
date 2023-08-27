const URL_PATH =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://payments-institutions-rank.vercel.app";

export async function updateHistorico() {
  const response = await fetch(`${URL_PATH}/api/updatehistorico`);
  const data = await response.json();
  return data;
}
