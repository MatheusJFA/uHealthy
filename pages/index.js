import Link from "next/link";
import Image from 'next/image'
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
      <div className={styles.container}>
     
       <Image 
        src="/landing.svg"
        alt="Landing page image"
        height="500"
        width="500"/>

        <div className={styles.login}>
          <h1>Bem-vindo!</h1>

            <input type="text" className={styles.cpf} name="cpf" id="cpf" placeholder="CPF"/>
            <input type="password" className={styles.password} name="password" id="password" placeholder="Senha"/>
          
          <div className={styles.footerLogin}>

            <h2>Não possui uma conta? <br/>
              <Link href="/cadastro">
                <a>Crie uma!</a>
              </Link>
            </h2>

            <button className={styles.btnPrimary}>Acessar</button>

          </div>
        </div>
      </div>
  )
}
