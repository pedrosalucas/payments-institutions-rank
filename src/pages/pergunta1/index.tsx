import { Grid, Text } from "@geist-ui/core";
import Pergunta1 from "@/components/perguntas/pergunta1/tabela";
import styles from '@/styles/Perguntas.module.css'
import Pergunta1Chart from "@/components/perguntas/pergunta1/grafico";



export default function pergunta1 () {
  const data = [
    {
      ds_ano: 2017,
      ds_trimestre: '2º',
      nm_instituicao_financeira: 'PARANÁ BANCO (conglomerado)',
      vl_indice: '23,16',
    },
    {
      ds_ano: 2017,
      ds_trimestre: '1º',
      nm_instituicao_financeira: 'PARANÁ BANCO (conglomerado)',
      vl_indice: '90,16',
    },
  ]

  return(
    <div className={styles.grid}>
      <Grid.Container gap={2} className={styles.grid}>
        <Grid>
        <Text margin="2vh" h1 style={{ letterSpacing: '0.6px' }}>
          <Text span >Resultados</Text>
        </Text>
          
        </Grid>
      </Grid.Container>
      <Pergunta1 data={data}/>
      <Pergunta1Chart data={data}/>
      
  </div>

  )
}