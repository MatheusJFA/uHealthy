import Router from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import Messages from '../utils/messages';
import Modal from '../components/Modal';
import ModalVaccine from '../components/Modal/Vaccine';

import { v4 as uuidv4 } from 'uuid';

export default function Table() {
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [vaccines, setVaccines] = useState([]);

  const [vaccineID, setVaccineID] = useState(undefined);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


  async function verification() {
    var jwtData = localStorage.getItem("JWT");
    const data = await jwt.decode(jwtData);
    setTimeout(() => {
      setName(data.name);
      setCPF(data.cpf);
      setUserID(data.id);
    }, 2000);
  }

  useEffect(() => {
    verification();
  }, [loading, name, cpf]);


  useEffect(() => {
    async function getVaccines() {
      const response = await fetch(`/api/vaccination?userId=${userID}`);
      const data = await response.json();

      setVaccines(data.vaccinations);
    }

    if (userID)
      getVaccines();
    setVaccineID(undefined);
  }, [loading, showModal, userID]);

  function openModal() {
    setShowModal(!showModal);
  }

  function logOut() {
    toast.success(Messages.MSG_S002);
    localStorage.removeItem("JWT");
    Router.push('/');
  }

  const renderDoses = (dose) => {
    return (
      <>
        <td key={uuidv4()} data-label="vaccineDoses">{dose ? dose : "-"}</td>
      </>
    );
  }

  function onRowClick(id) {
    setTimeout(() => {
      setVaccineID(id)
    }, 2000);

    openModal();
  }



  const renderVaccines = (vaccine) => {
    return (
      <tr key={vaccine.id} onClick={() => onRowClick(vaccine.id)}>
        <td scope="row" data-label="Vacinas">{vaccine.vaccineName}</td>
        <td data-label="Proteção Contra">{vaccine.vaccineType}</td>
        <td data-label="Fabricante">{vaccine.vaccineManufacturer}</td>
        <td data-label="LocalVacinacao">{vaccine.vaccinationLocal}</td>
        {vaccine.vaccineDoses.map((renderDoses))}
      </tr>
    );
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
        <button className="bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" type="button" onClick={() => logOut()}> Sair </button>
      </div>

      <nav className="navbar">
        <ul>
          <li><a href="#"> Vacinas Obrigatórias </a></li>
          <li><a href="#"> Vacinas de Campanhas </a></li>
        </ul>
      </nav>

      {!loading && vaccines.length > 0 &&
        <div className="flex flex-grow">
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
                {vaccines.map((renderVaccines))}
              </tbody>
            </table>
          </div>
        </div>
      }

      {loading && vaccines.length <= 0 &&
        <div className="flex flex-grow justify-center items-center">
          <p className="text-red-500 text-xl text-center mt-10">Este usuário não possui nenhuma vacina cadastrada!</p>
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
        form={<ModalVaccine showModal={setShowModal} userID={userID} vaccineId={vaccineID} />}
      />
    </>
  )
}