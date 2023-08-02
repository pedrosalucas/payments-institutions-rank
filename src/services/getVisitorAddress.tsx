const URL_PATH =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://payments-institutions-rank.vercel.app";

export async function getVisitorAddress(lat: number, lng: number) {
  const response = await fetch(`${URL_PATH}/api/visitorAddress`, {
    method: "POST",
    body: JSON.stringify({
      lat: lat.toString(),
      lng: lng.toString(),
    }),
  });
  const data = await response.json();
  return data;
}
