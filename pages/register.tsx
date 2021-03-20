import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import Router from 'next/router';
import Input from '../components/Input'
import styles from "../styles/Register.module.css";

import * as Yup from 'yup';
import Messages from "./messages";

import CPFValidate from "../utils/cpfValidation";

export default function Register() {
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function validate() : boolean {
    var today = new Date();
    const registerValidation = Yup.object().shape({
      cpf: Yup.string().min(11).max(14).test(
        "cpf validacao",
        "Por favor, insira um CPF válido",
        (value) => CPFValidate(value)
      ).required(),
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      birthDate: Yup.date().required().max(today),
      password: Yup.string().min(6).max(15).required(Messages.MSG_E003("Password")),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], Messages.MSG_A000),
    });

    if (!(registerValidation.isValid({ cpf, email, name, birthDate, password, passwordConfirmation }))) return false;
    return true;
  }

  async function Register(event) {
    event.preventDefault();
    if (validate()) {
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
              onChange={e => setBirthDate(e.target.value)}
              placeholder=" "
              value={birthDate}
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
              id="passwordConfirmation"
              onChange={e => setPasswordConfirmation(e.target.value)}
              placeholder=""
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