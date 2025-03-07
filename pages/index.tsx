import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import Router from 'next/router';
import Input from '../components/Input';
import styles from "../styles/Home.module.css";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { mask, unMask } from 'remask'

import Messages from "../utils/messages";

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
      var validation = await validate();

      if (validation) {
        const response = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ cpf, password })
        });

        const result = await response.json();

        if (result.error)
          toast.error(result.error);
        else {
          toast.success(Messages.MSG_S001);
          localStorage.setItem("JWT", result.token);
          Router.push('/table');
        }
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center mt-5">
        <Image className={styles.imgLogo}
          src="/Logo.svg"
          alt="uHealthy"
          width={300}
          height={125}
          layout="intrinsic"
          sizes="(max-width:767px 33vw,(max-width:568px) 50vw,100vw)"
          draggable="false"
        />
        <div className="font-medium tracking-widest	 flex justify-center">
          <p>uHealthy é seu cartão de vacinas digital.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-grow justify-around items-center">

        <Image
          src="/landing.svg"
          alt="Landing page image"
          width={700}
          height={500}
          draggable="false"
        />

        <form action="" className="mt-20 mb-20 md:mb-10 md:mt-10">
          <div className={styles.login}>
            <h1 className={styles.title} >Bem-vindo!</h1>
            <div className={styles.inputText}>
              <Input
                label="cpf"
                id="cpf"
                onChange={e => setCPF(mask(e.target.value, ['999.999.999-99']))}
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

              <button className="bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" onClick={(e) => login(e)} >Acessar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
