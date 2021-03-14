import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image'
import styles from "../styles/Home.module.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default function Home() {

  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");

  async function login(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpf, password })
      });

      const data = await response.json();

      NotificationManager.success("Redirecionando para a tela de usuarios", "Sucesso");
      localStorage.setItem("JWT", data.jwt);
      return data;
    } catch (error) {
      NotificationManager.Error(`Erro: ${error.message}`, "Error", 3000)
    }
  }

  return (
    <div className={styles.vhFull}>
      <div className={styles.about}>
        <Image className={styles.imgLogo}
          src="/Logo.svg"
          alt="uHealthy"
          draggable="false"
          width="300"
          height="125"
        />
        <div className={styles.aboutText}>
          <p>uHealthy é seu cartão de vacinas digital.</p>
        </div>
      </div>

      <div className={styles.container}>
        <Image
          className={styles.imgLogin}
          src="/landing.svg"
          alt="Landing page image"
          width="730"
          height="530"
          draggable="false"
        />

        <div className={styles.login}>
          <h1 className={styles.title}>Bem-vindo!</h1>

          <form>
            <div className={styles.inputText}>
              <div className={styles.fields}>
                <input type="text" name="cpf" id="cpf" value={cpf} onChange={e => setCPF(e.target.value)} placeholder="XXX.XXX.XXX-XX" />
                <label htmlFor="cpf"> cpf </label>
              </div>
              <div className={styles.fields}>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                <label htmlFor="password"> senha </label>
              </div>
            </div>

            <div className={styles.footerLogin}>

              <h2>Não possui uma conta?<br />
                <Link href="/register">
                  <a>Crie uma!</a>
                </Link>
              </h2>

              <button className={styles.btnPrimary} onClick={(e) => login(e)}>Acessar</button>
            </div>
          </form>
        </div>
      </div>
      <NotificationContainer />
    </div>

  )
}
