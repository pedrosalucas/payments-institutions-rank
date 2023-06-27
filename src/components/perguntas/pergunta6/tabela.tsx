import React from 'react';
import styles from "@/styles/Perguntas.module.css";
import { tb_reclamacao_cliente_por_if} from "@prisma/client";

interface TableProps {
  data: tb_reclamacao_cliente_por_if[];
}

const Pergunta6: React.FC<TableProps> = ({ data }) => {

  

  return (
    <div className={styles.tablewrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={`${styles.tablethead} ${styles.tabletth}`}>
						<th className={styles.tabletth}>Nome da instituição</th>
						<th className={styles.tabletth}>Ano</th>
						<th className={styles.tabletth}>Trimestre</th>
            <th className={styles.tabletth}>Quantidade de Clientes CCS/SCR</th>
            <th className={styles.tabletth}>Índice</th>
          </tr>
        </thead>
        <tbody className={styles.expand}>
          {data.map((item, index) => (
            <tr key={index} className={styles.tablettd}>
              <td className={styles.tablettd}>{item.nm_instituicao_financeira}</td>
              <td className={styles.tablettd}>{item.ds_ano}</td>
              <td className={styles.tablettd}>{item.ds_trimestre}</td>
              <td className={styles.tablettd}>{item.qtd_clientes_ccs_scr}</td>
              <td className={styles.tablettd}>{item.vl_indice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Pergunta6;
