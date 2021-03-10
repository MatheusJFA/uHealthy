import Link from "next/link";
import Image from 'next/image';
import styles from "../styles/Register.module.css";

export default function Register() {
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
          <h1 className={styles.title} >Cadastre-se</h1>
  
          <div className={styles.inputText}>
            <div className={styles.fields}>
              <input type="text"  name="cpf" id="cpf" placeholder="XXX.XXX.XXX-XX" />
              <label htmlFor="cpf"> cpf </label>
            </div>
            <div className={styles.fields}>
              <input type="email"  name="email" id="email" placeholder="example@domain.com.br" />
              <label htmlFor="email"> email </label>
            </div>
            <div className={styles.fields}>
              <input type="text"  name="name" id="name" placeholder=" " />
              <label htmlFor="name"> nome </label>
            </div>
            <div className={styles.fields}>
              <input type="text"  name="data" id="data" placeholder="DD/MM/AAAA" />
              <label htmlFor="data"> data de nascimento </label>
            </div>
            <div className={styles.fields}>
              <input type="text"  name="tellphone" id="tellphone" placeholder=" " />
              <label htmlFor="tellphone"> telefone </label>
            </div>
            <div className={styles.fields}>
              <input type="password"  name="passwords" id="passwords"  placeholder=" " />
              <label htmlFor="passwords"> senha </label>
            </div>
            <div className={styles.fields}>
              <input type="password" name="password" id="password"  placeholder=" "/>
              <label htmlFor="password"> confirmar senha </label>
            </div>
        
          </div>
         
          <div className={styles.footerLogin}>
            <button className={styles.btnPrimary}>Cadastrar</button>
          </div>
        
        </div>
      </div>
    )
}