const URL_PATH =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://payments-institutions-rank.vercel.app";

export async function getNextTrimestre() {
  const response = await fetch(`${URL_PATH}/api/getlastupdate`);
  const data = await response.json();
  return data[0];
}
