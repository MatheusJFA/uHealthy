import Link from "next/link";
import Image from 'next/image'
import styles from "../styles/Home.module.css";


export default function Home() {
  return (
    <div className={styles.container}>

      <Image
        className={styles.imgLogin}
        src="/cadastro.svg"
        alt="Landing page image"
        width="730"
        height="530"
        draggable="false"
      />

      <div className={styles.login}>
        <h1 className={styles.title} >Bem-vindo!</h1>

        <div className={styles.inputText}>
          <div className={styles.fields}>
            <input type="text" className={styles.cpf} name="cpf" id="cpf" placeholder="XXX.XXX.XXX-XX" />
            <label htmlFor="cpf"> cpf </label>
          </div>
          <div className={styles.fields}>
            <input type="password" className={styles.password} name="password" id="password" placeholder="Senha" />
            <label htmlFor="password"> senha </label>
          </div>
        </div>
       
        <div className={styles.footerLogin}>

          <h2>Não possui uma conta? <br />
            <Link href="/register">
              <a>Crie uma!</a>
            </Link>
          </h2>

          <button className={styles.btnPrimary}>Acessar</button>

        </div>
      </div>
    </div>
  )
}
