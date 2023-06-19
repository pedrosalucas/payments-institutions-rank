import styles from "../styles/styles.module.css";

const homepage: React.FC = () => {
    return (
        <div className={styles.container}> 
            <h1 className={styles.title}>Payments Institutions Rank</h1>           
            <div className={styles.boxContainer}>
                <div className={styles.box}/>
                <div className={styles.box}/>
                <div className={styles.box}/>
                <div className={styles.box}/>
            </div>
        </div>
    )
}

export default homepage