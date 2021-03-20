import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import Input from '../components/Input'
import styles from "../styles/Register.module.css";


export default function Register() {

  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function Log(cpf, email, name, date, phone, password, passwordConfirmation) {
    console.log(cpf, email, name, date, phone, password, passwordConfirmation);
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
               label="name"
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
               label="Telefone"
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
            <button className={styles.btnPrimary} onSubmit={(cpf, email, name, date, phone, password, passwordConfirmation) => Log(cpf, email, name, date, phone, password, passwordConfirmation)}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}