import styles from '@/styles/Home.module.css'
import { Text } from '@geist-ui/core'

export default function About() {
    return (
        <div>
            <div className={styles.container}>
                <Text h1>Bem-vindo ao Payments Institutions Rank!</Text>
                <br></br>
                <Text h2 width={"60%"}> 
                    Somos uma plataforma dedicada a fornecer informações transparentes e essenciais sobre instituições financeiras. Nosso objetivo é capacitar você, consumidor, com conhecimentos detalhados sobre o desempenho das instituições financeiras em relação ao índice de reclamações.
                </Text>
                <br></br>
                <Text h2 width={"60%"}>
                    Em nosso site, você encontrará rankings detalhados das instituições financeiras com base no índice de reclamações, consolidando dados recebidos, analisados e encerrados pelo Banco Central em cada período de referência. Através dessas informações, você poderá identificar as instituições que têm obtido maior número de reclamações e tomar decisões informadas sobre seus relacionamentos financeiros.
                </Text>
                <br></br>
                <Text h2 width={"60%"}>
                    Além disso, oferecemos insights valiosos sobre a variação do índice de reclamações ao longo do tempo para as principais instituições, permitindo que você acompanhe tendências e identifique padrões. Com esses dados, você estará mais bem preparado para tomar decisões conscientes sobre suas interações com as instituições financeiras.
                </Text>
                <br></br>
                <Text h2 width={"60%"}>
                    Nosso site é atualizado regularmente com os dados mais recentes, garantindo que você tenha acesso às informações mais atualizadas e relevantes. Nossa plataforma é fácil de usar, tornando a exploração dos rankings e a obtenção de informações específicas sobre cada instituição financeira uma tarefa simples e rápida.
                </Text>
                <br></br>
                <Text h2 width={"60%"}>
                    Estamos comprometidos em fornecer transparência e empoderar os consumidores financeiros, permitindo que você faça escolhas informadas e proteja seus interesses. Acreditamos que todos têm o direito de conhecer o desempenho das instituições financeiras e buscar um relacionamento financeiro seguro e satisfatório.
                </Text>
                <br></br>
                <Text h2 width={"60%"}>
                    Explore nosso site, familiarize-se com os rankings e dados apresentados e tome decisões financeiras mais embasadas. Estamos aqui para ser seu aliado na busca por uma experiência financeira mais transparente e positiva.
                </Text>
            </div>
        </div>
    )
}