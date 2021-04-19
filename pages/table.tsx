import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';

import Messages from '../utils/messages';
import Modal from '../components/Modal';
import ModalVaccine from '../components/Modal/Vaccine';

export default function Table() {
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [vaccines, setVaccines] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function Verification() {
      var jwtData = localStorage.getItem("JWT");
      const data = await jwt.decode(jwtData);

      if (!jwtData) {
        toast.error(Messages.MSG_E006);
        Router.push('/');
      }
      else {
        setName(data.name);
        setCPF(data.cpf);
        setUserID(data.id);
        setLoading(true);
      }
    }
    Verification();
  }, []);


  useEffect(() => {
    async function GetVaccines() {
      const response = await fetch(`/api/vaccination?userId=${userID}`);
      const data = await response.json();

      if (data.error)
        toast.error(data.error);
      else
        setVaccines(data);
    }
    if (loading)
      GetVaccines();
  }, [loading])

  function openModal() {
    setShowModal(!showModal);
  }

  function LogOut() {
    toast.success(Messages.MSG_S002);
    localStorage.removeItem("JWT");
    Router.push('/');
  }

  return (
    <>
      <div className="header-login">
        <div className="nav-page">
          <img className="user-perfil" src="../man.svg" alt="Imagem padrão de usuário" />
          <div>
            <div className="user-name">{name}</div>
            <div className="user-id">{cpf}</div>
          </div>
        </div>
        <button className="bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" type="button" onClick={() => LogOut()}> Sair </button>
      </div>

      <nav className="navbar">
        <ul>
          <li><a href="#"> Vacinas Obrigatórias </a></li>
          <li><a href="#"> Vacinas de Campanhas </a></li>
        </ul>
      </nav>

      {loading && vaccines &&
        <>
          <p className="text-red-500 text-xl text-center mt-10">Este usuário não possui nenhuma vacina cadastrada!</p>
        </>
      }

      {loading && vaccines.length > 0 &&
        <div className="flex-grow">
          <div className="table-vacination">
            <table>
              <thead>
                <tr>
                  <th scope="col">Vacinas</th>
                  <th scope="col">Tipo da Vacina</th>
                  <th scope="col">Fabricante</th>
                  <th scope="col">Local Vacinação</th>
                  <th scope="col">1º Dose Data</th>
                  <th scope="col">2º Dose Data</th>
                  <th scope="col">3º Dose Data</th>
                  <th scope="col">1º Reforço Data</th>
                  <th scope="col">2º Reforço Data</th>
                </tr>
              </thead>
              <tbody>

                {vaccines.map((vaccine) => {
                  <tr>
                    <td scope="row" data-label="Vacinas">{vaccine.vaccineName}</td>
                    <td data-label="Proteção Contra">{vaccine.vaccineType}</td>
                    <td data-label="Fabricante">{vaccine.vaccineManufacturer}</td>
                    <td data-label="LocalVacinacao">{vaccine.vaccinationLocal}</td>
                    {vaccine.vaccineDoses.map((dose, index) => {
                      <td data-label={`${index}º Dose Data`}>{dose}</td>
                    })}
                  </tr>
                })};
              </tbody>
            </table>
          </div>
        </div>
      }
      <div className="flex justify-end m-8">
        <button type="button" className="hover:cursor-pointer hover:shadow-md rounded-full border-none w-12" onClick={() => openModal()}>
          <img src="/add_circle_outline.svg" />
        </button>
      </div>

      <Modal
        isOpen={showModal}
        title="Cadastrar nova vacina"
        onCancel={() => openModal()}
        actions=""
        form={<ModalVaccine showModal={setShowModal} userID={userID} />}
      />

    </>
  )
}