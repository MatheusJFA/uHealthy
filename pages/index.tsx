import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import Router from 'next/router';
import Input from '../components/Input';
import styles from "../styles/Home.module.css";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Messages from './messages';
import { mask ,unMask } from 'remask'

export default function Home() {

  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");

  async function validate() {
    const schema = Yup.object().shape({
      cpf: Yup.string().min(11).max(14).required(Messages.MSG_E002("CPF")),
      password: Yup.string().required(Messages.MSG_E004("Senha", 6, 15))
    });

    if (!(await schema.isValid({ cpf, password }))) return false;

    return true;
  }

  async function login(event) {
    event.preventDefault();
    try {
      if (validate()) {
        const response = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ cpf, password })
        });

        const data = await response.json();
        if (data.error)
          toast.error(data.error);
        else {
          toast.success(Messages.MSG_S001);
          localStorage.setItem("JWT", data.jwt);
          Router.push('/table');
        }
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className={styles.vhFull}>
      <div className={styles.about}>
        <Image className={styles.imgLogo}
          src="/Logo.svg"
          alt="uHealthy"
          width={300}
          height={125}
          layout="intrinsic"
          sizes="(max-width:767px 33vw,(max-width:568px) 50vw,100vw)"
          draggable="false"
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
          width={730}
          height={530}
          layout="intrinsic"
          sizes="(max-width:767px 33vw,(max-width:568px) 50vw,100vw)"
          draggable="false"
        />

        <form action="">
          <div className={styles.login}>
            <h1 className={styles.title} >Bem-vindo!</h1>
            <div className={styles.inputText}>
              <Input
                label="cpf"
                id="cpf"
                onChange={e => setCPF(mask(unMask(e.target.value),['999.999.999-99']))}
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
