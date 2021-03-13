import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image'
import styles from "../styles/Home.module.css";


export default function Home() {
  const[cpf, setCPF] = useState("");
  const[password, setPassword] = useState("");

  return (
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
        <h1 className={styles.title} >Bem-vindo!</h1>

        <div className={styles.inputText}>
          <div className={styles.fields}>
            <input type="text"  name="cpf" id="cpf" value={cpf} OnChangeText={setCPF} placeholder="XXX.XXX.XXX-XX" />
            <label htmlFor="cpf"> cpf </label>
          </div>
          <div className={styles.fields}>
            <input type="password"  name="password" id="password" value={password} OnChangeText={setPassword} placeholder="Senha" />
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
