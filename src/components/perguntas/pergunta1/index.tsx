import { Text, Code } from "@geist-ui/core";
import styles from "@/styles/Home.module.css"
import { Table } from "@/components/table/Table";

export default function Pergunta1() {
  const columns = [
    {
      key: "ds_ano",
      label: "ANO"
    },
    {
      key: "ds_trimestre",
      label: "TRIMESTRE"
    },
    {
      key: "nm_instituicao_financeira",
      label: "INSTITUIÇÃO FINANCEIRA/BANCO"
    },
    {
      key: "vl_indice",
      label: "ÍNDICE"
    },
  ]
  const rows = [
    {
      key:"1",
      ds_ano:"2017",
      nm_instituicao_financeira: "PARANÁ BANCO (conglomerado)",
      vl_indice:"90,16"
    }
  ]

  return (
    <></>
  );
}