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

export async function getCountriesList() {
  try {
    const response = await fetch(`${URL_PATH}/api/accessInfo/countries/list`);
    const data = await response.json();

    const countryNames: string[] = data.map((country: { nm_pais: string }) => country.nm_pais);
    return countryNames;
  } catch (error) {
    console.error('Error fetching country list:', error);
    return [];
  }
}

export async function getStatesList(countryName: string | null) {
  try {
    const response = await fetch(`${URL_PATH}/api/accessInfo/states/list?country=${countryName}`);
    const data = await response.json();

    const stateNames: string[] = data.map((state: { nm_estado: string }) => state.nm_estado);
    return stateNames;
  } catch (error) {
    console.error('Error fetching state list:', error);
    return [];
  }
}

export async function getCitiesList(countryName: string | null, stateName: string | null) {
  try {
    const response = await fetch(`${URL_PATH}/api/accessInfo/cities/list?country=${countryName}&state=${stateName}`);
    const data = await response.json();

    const cityNames: string[] = data.map((city: { nm_cidade: string }) => city.nm_cidade);
    return cityNames;
  } catch (error) {
    console.error('Error fetching state list:', error);
    return [];
  }
}

export async function getCountrySum(countryName: string | null) {
  const response = await fetch(`${URL_PATH}/api/accessInfo/countries/sum_access?country=${countryName}`);
  const data = await response.json();
  if (data.length > 0) {
    return data[0].cont_acessos;
  } else {
    return null;
  }
}

export async function getStateSum(countryName: string | null, stateName: string | null) {
  const response = await fetch(`${URL_PATH}/api/accessInfo/states/sum_access?country=${countryName}&state=${stateName}`);
  const data = await response.json();
  if (data.length > 0) {
    return data[0].cont_acessos;
  } else {
    return null;
  }
}

export async function getCitySum(countryName: string | null, stateName: string | null, cityName: string | null) {
  const response = await fetch(
    `${URL_PATH}/api/accessInfo/cities/sum_access?country=${countryName}&state=${stateName}&city=${cityName}`
  );
  const data = await response.json();

  if (data.length > 0) {
    return data[0].cont_acessos;
  } else {
    return null;
  }
}

