import { tb_historico_acesso } from "@prisma/client/";

const URL_PATH =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://payments-institutions-rank.vercel.app";

export async function setNewAccessInfo(accessInfo: tb_historico_acesso) {
  const body = {
    ip_acesso: accessInfo.ip_acesso,
    nm_cidade: accessInfo.nm_cidade,
    nm_estado: accessInfo.nm_estado,
    nm_pais: accessInfo.nm_pais,
    x_latitude: accessInfo.x_latitude,
    y_longitude: accessInfo.y_longitude,
  };

  const response = await fetch(`${URL_PATH}/api/accessInfo/newAccess/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

export async function getAccessHistory() {
  const response = await fetch(`${URL_PATH}/api/accessInfo/`);
  const data = await response.json();
  return data;
}
