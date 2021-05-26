import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useGlobalContext } from '../common/hooks/useGlobalContext';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import Messages from '../utils/messages';
import Modal from '../components/Modal';
import ModalVaccine from '../components/Modal/Vaccine';
import Header from '../components/Header';

import { v4 as uuidv4 } from 'uuid';

export default function Table() {
  const [userID, setUserID] = useState("");
  const [dependent, setDependent] = useState({ id: -1, name: "", cpf: "" });
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [vaccines, setVaccines] = useState([]);

  const [vaccineID, setVaccineID] = useState(undefined);

  const [showModal, setShowModal] = useState(false);
  const { changeLoading } = useGlobalContext();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function verification() {
      setLoading(true)
      changeLoading(true);
      var jwtData = localStorage.getItem("JWT");
      if (!jwtData) {
        toast.error(Messages.MSG_E006);
        Router.push("/")
      }
      const data = await jwt.decode(jwtData);
      const dependentData = JSON.parse(localStorage.getItem("dependent"));
      if (dependentData) {
        setDependent(dependentData);
      }

      setName(data.name);
      setCPF(data.cpf);
      setUserID(data.id);
    }
    verification();
  }, [changeLoading]);

  useEffect(() => {
    async function getVaccines() {
      let response;
      if (dependent.id === -1) {
        response = await fetch(`/api/vaccination?userId=${userID}`);
      }
      else {
        response = await fetch(`/api/vaccination?userId=${userID}&dependentId=${dependent.id}`);
      }

      const data = await response.json();
      console.log(data);

      setVaccines(data.vaccinations);

      changeLoading(false);
      setLoading(false);
    }

    if (userID)
      getVaccines();
    //setVaccineID(undefined);
  }, [changeLoading, showModal, userID]);

  function openModal() {
    setShowModal(!showModal);
  }

  const renderDoses = (dose) => {
    return (
      <>
        <td key={uuidv4()} data-label="vaccineDoses">{dose ? dose : "-"}</td>
      </>
    );
  }

  function onRowClick(id) {
    setVaccineID(id);
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
      <Header cpf={dependent.cpf !== "" ? dependent.cpf : cpf} name={dependent.name !== "" ? dependent.name : name} showBack />

      <nav className="navbar">
        <ul>
          <li><a href="#"> Vacinas Obrigatórias </a></li>
          {/* <li><a href="#"> Vacinas de Campanhas </a></li> */}
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

      {!loading && vaccines.length <= 0 &&
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
        title="Manter Vacina"
        onCancel={() => openModal()}
        actions=""
        form={
          <ModalVaccine
            showModal={setShowModal}
            userID={userID}
            vaccineID={vaccineID}
          />
        }
      />


    </>
  )
}