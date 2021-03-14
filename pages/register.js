import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import styles from "../styles/Register.module.css";

export default function Register() {

  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  
  async function Register() {
    const response = await fetch("/api/usuario/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringfy({ cpf, name, email, password, passwordConfirmation, phone, birthDate })
    });

    const data = await response.json();
    localStorage.setItem(data.jwt);
    return data;
  }


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
        <h1 className={styles.title}>Cadastre-se</h1>
        <form>
          <div className={styles.inputText}>
            <div className={styles.fields}>
              <input type="text" name="cpf" id="cpf" value={cpf} onChange={e => setCPF(e.target.value)} maxLength="14" placeholder="XXX.XXX.XXX-XX" required pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                title="Digite o CPF no formato XXX.XXX.XXX-XX" />
              <label htmlFor="cpf"> cpf </label>
            </div>
            <div className={styles.fields}>
              <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@domain.com.br" required />
              <label htmlFor="email"> email </label>
            </div>
            <div className={styles.fields}>
              <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} placeholder=" " required />
              <label htmlFor="name"> nome </label>
            </div>
            <div className={styles.fields}>
              <input type="date" name="birthDate" id="birthDate" value={birthDate} onChange={e => setBirthDate(e.target.value)} placeholder="DD/MM/AAAA" required />
              <label htmlFor="birthDate"> data de nascimento </label>
            </div>
            <div className={styles.fields}>
              <input type="text" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder=" " required />
              <label htmlFor="phone"> telefone </label>
            </div>
            <div className={styles.fields}>
              <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder=" " />
              <label htmlFor="password"> senha </label>
            </div>
            <div className={styles.fields}>
              <input type="password" name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder=" " />
              <label htmlFor="passwordConfirmation"> confirmar senha </label>
            </div>
          </div>

          <div className={styles.footerLogin}>
            <button className={styles.btnPrimary} onClick={() => Register()}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}