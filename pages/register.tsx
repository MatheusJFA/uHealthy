import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import Router from 'next/router';
import Input from '../components/Input'
import styles from "../styles/Register.module.css";


export default function Register() {

  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");


  async function Register(event) {
    event.preventDefault();
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cpf, name, email, password, passwordConfirmation, phone, birthDate })
    });

    const data = await response.json();
    localStorage.setItem("JWT", data.jwt);
    Router.push('/');
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
            <Input
              label="cpf"
              id="cpf"
              onChange={e => setCPF(e.target.value)}
              placeholder="XXX.XXX.XXX-XX"
              value={cpf}
              type="text"
            />

            <Input
              label="email"
              id="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="example@domain.com.br"
              value={email}
              type="email"
            />

            <Input
              label="nome"
              id="name"
              onChange={e => setName(e.target.value)}
              placeholder=" "
              value={name}
              type="text"
            />

            <Input
              label="data de nascimento"
              id="data"
              onChange={e => setDate(e.target.value)}
              placeholder=" "
              value={date}
              type="date"
            />

            <Input
              label="telefone"
              id="phone"
              onChange={e => setPhone(e.target.value)}
              placeholder=" "
              value={phone}
              type="text"
            />

            <Input
              label="senha"
              id="password"
              onChange={e => setPassword(e.target.value)}
              placeholder=" "
              value={password}
              type="password"
            />

            <Input
              label="confirmar senha"
              id="passwordConf"
              onChange={e => setPasswordConfirmation(e.target.value)}
              placeholder=" "
              value={passwordConfirmation}
              type="password"
            />

          </div>

          <div className={styles.footerLogin}>
            <button className={styles.btnPrimary} onClick={(event) => Register(event)}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}