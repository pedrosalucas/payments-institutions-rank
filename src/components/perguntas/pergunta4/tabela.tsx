import React from 'react';
import styles from "@/styles/Perguntas.module.css";
import { tb_reclamacao_cliente_por_if} from "@prisma/client";

/*interface TableData {
  ds_ano: number;
  ds_trimestre: string;
  nm_instituicao_financeira: string;
  vl_indice: string;
}*/
interface TableProps {
  data: tb_reclamacao_cliente_por_if[];
}

const Pergunta4: React.FC<TableProps> = ({ data }) => {
  const formatVlIndice = (value: string | null) => {
    if (value === null){
      return 0;
    }
    const cleanedValue = value.replace(",", ".");
    return parseFloat(cleanedValue);
  };

  const sortedData = data.sort((a, b) => {
    const anoA = (a.ds_ano);
    const anoB = (b.ds_ano);
    return anoA - anoB;
  });

  return (
    <div className={styles.tablewrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.tablethead} ${styles.tabletth}`}>
            <th className={styles.tabletth}>Instituição Financeira/Banco</th>
            <th className={styles.tabletth}>Quantidade de Clientes CCS/SCR</th>
            <th className={styles.tabletth}>Índice</th>
          </tr>
        </thead>
        <tbody className={styles.expand}>
          {sortedData.map((item, index) => (
            <tr key={index} className={styles.tablettd}>
              <td className={styles.tablettd}>{item.nm_instituicao_financeira}</td>
              <td className={styles.tablettd}>{item.qtd_clientes_ccs_scr}</td>
              <td className={styles.tablettd}>{formatVlIndice(item.vl_indice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Pergunta4;
