import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useGlobalContext } from '../../../common/hooks/useGlobalContext';

import { mask, unMask } from "remask";
import Messages from '../../../utils/messages';
import Input from '../../Input';
import ToggleButton from '../../ToggleButton';

import CPFValidate from "../../../utils/cpfValidation";

import styles from "../styles/Register.module.css";


interface IModal {
  userID: string;
  showModal: any;
}

export default function Modal(property: IModal) {
  const userId = property.userID;

  const [loading, setLoading] = useState(false);
  const { changeLoading } = useGlobalContext();

  const [name, setName] = useState();
  const [cpf, setCPF] = useState();
  const [birthDate, setBirthDate] = useState();

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
        .validate({ cpf, name, birthDate }, { abortEarly: false })
        .catch(errors => {
          errors.inner.map(error => {
            errorsList.push("• " + error.message);
            return { field: error.path, message: error.message };
          });
        });
    } catch (error) {
      toast.error(error);
    }

    if (!errorsList)
      toast.error(Messages.MSG_ERROR(errorsList));

    if (!(await schema.isValid({ cpf, name, birthDate }))) return false;

    return true;
  }

  async function Register(event) {
    event.preventDefault();
    try {
      if (!ValidateCPF())
        return toast.error(Messages.MSG_CPF_ERROR);

      var validation = await validate();

      if (validation) {

        const response = await fetch("/api/user/dependent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, cpf, name, birthDate })
        });

        const result = await response.json();

        if (result.error)
          toast.error(result.error);
        else {
          toast.success(Messages.MSG_S000);
          return result;
        }
      } else {
        return toast.warning(Messages.MSG_A002);
      }
    } catch (error) {
      toast.error(error);
    }
  }


  return (
    <>
      {property.showModal &&
        <form>
          <div className="background">
            <div className="conteudoModal">
              <Input
                label="Nome do dependente"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite o nome do dependente"
                type="text" />

              <Input
                label="CPF do dependente"
                id="cpf"
                value={cpf}
                onChange={e => setCPF(mask(e.target.value))}
                placeholder="XXX.XXX.XXX-XX"
                type="text" />

              <Input
                label="data de nascimento do dependente"
                id="dataNascimento"
                placeholder=" "
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                type="date" />

              <div className={styles.footerLogin}>
                <button className="bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" onClick={(event) => Register(event)}>Cadastrar</button>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
}
