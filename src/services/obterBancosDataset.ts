let converterCsvParaJson = require("convert-csv-to-json");

export async function getData(ano: number, periodo: number) {
  const response = await fetch(
    `https://www3.bcb.gov.br/rdrweb/rest/ext/ranking/arquivo?ano=${ano}&periodicidade=TRIMESTRAL&periodo=${periodo}&tipo=Bancos+e+financeiras`
  );
  const data = await response.json();
  return converterCsvParaJson(data);
}
