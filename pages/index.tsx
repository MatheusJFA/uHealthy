import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import Router from 'next/router';
import Input from '../components/Input';
import styles from "../styles/Home.module.css";

export default function Home() {

  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");

  async function login(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpf, password })
      });

      const data = await response.json();

      localStorage.setItem("JWT", data.jwt);
      return data;
    } catch (error) {
      throw new Error(`Erro: ${error.message}`);
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

        <form action="">
          <div className={styles.login}>
            <h1 className={styles.title} >Bem-vindo!</h1>
            <div className={styles.inputText}>
              <Input
                label="cpf"
                id="cpf"
                onChange={e => setCPF(e.target.value)}
                placeholder="XXX.XXX.XXX-XX"
                value={cpf}
                type="text"
              />
              <Input
                label="senha"
                id="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                value={password}
                type="password"
              />
            </div>

            <div className={styles.footerLogin}>

              <h2>Não possui uma conta? <br />
                <Link href="/register">
                  <a>Crie uma!</a>
                </Link>
              </h2>

              <button className={styles.btnPrimary} onClick={(e) => login(e)} >Acessar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}