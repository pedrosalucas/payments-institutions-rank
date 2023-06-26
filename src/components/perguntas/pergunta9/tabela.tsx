import React from 'react';
import styles from "@/styles/Perguntas.module.css";
import { tb_irregularidade_por_if} from "@prisma/client";

interface TableProps {
  data: tb_irregularidade_por_if[];
}

const Pergunta9: React.FC<TableProps> = ({ data }) => {

  

  return (
    <div className={styles.tablewrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.tablethead} ${styles.tabletth}`}>
            <th className={styles.tabletth}>Banco/Instituição Financeira</th>
            <th className={styles.tabletth}>Irregularidade</th>
            <th className={styles.tabletth}>Reclamações Não Reguladas</th>
            <th className={styles.tabletth}>Total de Reclamações</th>
          </tr>
        </thead>
        <tbody className={styles.expand}>
          {data.map((item, index) => (
            <tr key={index} className={styles.tablettd}>
              <td className={styles.tablettd}>{item.nm_instituicao_financeira}</td>
              <td className={styles.tablettd}>{item.ds_irregularidade}</td>
              <td className={styles.tablettd}>{item.qtd_reclamacoes_nao_reguladas}</td>
              <td className={styles.tablettd}>{item.qtd_total_reclamacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Pergunta9;
