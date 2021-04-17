import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import Router from 'next/router';
import Input from '../components/Input'
import styles from "../styles/Register.module.css";

import * as Yup from 'yup';

import Messages from "../utils/messages";

import CPFValidate from "../utils/cpfValidation";
import { mask, unMask } from "remask";
import { toast } from "react-toastify";

export default function Register() {
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function ValidateCPF(): boolean {
    return CPFValidate(cpf);
  }

  async function validate() {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(Messages.MSG_E003("CPF")),
      email: Yup.string().email(Messages.MSG_E003("Email")).required(),
      name: Yup.string().required(Messages.MSG_E003("Nome")),
      password: Yup.string().min(6).max(15).required(Messages.MSG_E003("Password")),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], Messages.MSG_A000),
    });

    var errorsList = [];
    try {
      var errors = await schema
        .validate({ cpf, email, name, birthDate, password, passwordConfirmation }, { abortEarly: false })
        .catch(errors => {
          errors.inner.map(error => {
            errorsList.push("• " + error.message);
            return { field: error.path, message: error.message };
          });
        });
    } catch (error) {
      toast.error(error);
    }

    if (errorsList == null)
      toast.error(Messages.MSG_ERROR(errorsList));

    if (!(await schema.isValid({ cpf, email, name, birthDate, password, passwordConfirmation }))) return false;

    return true;
  }

  async function Register(event) {
    event.preventDefault();
    try {
      if (!ValidateCPF())
        return toast.error(Messages.MSG_CPF_ERROR);

      await validate();

      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpf, name, email, password, passwordConfirmation, phone, birthDate })
      });

      const result = await response.json();

      if (result.error)
        toast.error(result.error);
      else {
        toast.success(Messages.MSG_S000);
        Router.push('/');
        return result;
      }
    } catch (error) {
    toast.error(error);
  }
}


return (
  <>
    <div className="flex flex-col justify-center mt-5">
      <Image className=""
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

    <div className="flex flex-col md:flex-row  justify-around items-center mt-14 md:mt-0 mb-8 md:mb-0">

      <Image
        className={styles.imgLogin}
        src="/cadastro.svg"
        alt="Landing page image"
        width="730"
        height="530"
        draggable="false"
      />

      <div className={styles.login}>
        <h1 className="mt-10 mb-5 md:mt-3 md:mb-3">Cadastre-se</h1>
        <form>
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
              onChange={e => setPhone(mask(e.target.value, ['(99) 9999-9999', '(99) 99999-9999', '(99) 9 9999-9999']))}
              placeholder="(XX)XXXX-XXXX"
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
  </>
)
}