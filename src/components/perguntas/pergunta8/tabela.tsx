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
            <th className={styles.tabletth}>Banco/Instituição Financeira</th>
            <th className={styles.tabletth}>Reclamações Reguladas Procedentes</th>
            <th className={styles.tabletth}>Reclamações Não Reguladas</th>
          </tr>
        </thead>
        <tbody className={styles.expand}>
          {data.map((item, index) => (
            <tr key={index} className={styles.tablettd}>
              <td className={styles.tablettd}>{item.nm_instituicao_financeira}</td>
              <td className={styles.tablettd}>{item.qtd_reclamacoes_reguladas_procedentes}</td>
              <td className={styles.tablettd}>{item.qtd_reclamacoes_nao_reguladas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Pergunta8;
