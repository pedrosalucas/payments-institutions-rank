import React from 'react';
import styles from "@/styles/Perguntas.module.css";
import { tb_reclamacao_cliente_por_if} from "@prisma/client";

interface TableProps {
  data: tb_reclamacao_cliente_por_if[];
}

const Pergunta8: React.FC<TableProps> = ({ data }) => {

  

  return (
    <div className={styles.tablewrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.tablethead} ${styles.tabletth}`}>
            <th className={styles.tabletth}>Ano</th>
            <th className={styles.tabletth}>Trimestre</th>
            <th className={styles.tabletth}>Instituição Financeira</th>
            <th className={styles.tabletth}>Quantidade Absoluta de Reclamações</th>
          </tr>
        </thead>
        <tbody className={styles.expand}>
          {data.map((item, index) => (
            <tr key={index} className={styles.tablettd}>
              <td className={styles.tablettd}>{item.ds_ano}</td>
              <td className={styles.tablettd}>{item.ds_trimestre}</td>
              <td className={styles.tablettd}>{item.nm_instituicao_financeira}</td>
              <td className={styles.tablettd}>{item.qtd_total_reclamacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Pergunta8;
