import React from 'react';
import styles from "@/styles/Perguntas.module.css";

interface TableData {
  ds_ano: number;
  ds_trimestre: string;
  nm_instituicao_financeira: string;
  vl_indice: string;
}

interface TableProps {
  data: TableData[];
}

const Pergunta1: React.FC<TableProps> = ({ data }) => {
  const formatVlIndice = (value: string) => {
    const cleanedValue = value.replace(",", ".");
    return parseFloat(cleanedValue);
  };

  const sortedData = data.sort((a, b) => {
    const trimestreA = parseInt(a.ds_trimestre);
    const trimestreB = parseInt(b.ds_trimestre);
    return trimestreA - trimestreB;
  });

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.tablethead} ${styles.tabletth}`}>
            <th className={styles.tabletth}>Ano</th>
            <th className={styles.tabletth}>Trimestre</th>
            <th className={styles.tabletth}>Instituição Financeira/Banco</th>
            <th className={styles.tabletth}>Índice</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className={styles.tablettd}>
              <td className={styles.tablettd}>{item.ds_ano}</td>
              <td className={styles.tablettd}>{item.ds_trimestre}</td>
              <td className={styles.tablettd}>{item.nm_instituicao_financeira}</td>
              <td className={styles.tablettd}>{formatVlIndice(item.vl_indice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pergunta1;
