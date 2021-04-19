import React, { useEffect, useState } from "react";
import Input from "../Input";

interface IModal {
  userID: string;
  vaccineID?: string;
  openModal: boolean;
}

export default function Modal(property: IModal) {
  const userID = property.userID;
  const vaccineID = property.vaccineID;
  const openModal = property.openModal;

  let [showModal, setShowModal] = useState(openModal);

  const [vaccineName, setVaccineName] = useState();
  const [vaccineType, setVaccineType] = useState();
  const [vaccineManufacturer, setVaccineManufacturer] = useState();
  const [vaccineMandatory, setVaccineMandatory] = useState();
  const [vaccineDoses, setVaccineDoses] = useState([]);
  const [vaccinationLocal, setVaccinationLocal] = useState();

  useEffect(() => {
    if (vaccineID) {

    }
  }, []);

  function closeModal() {
    console.log("closeModal - Antes:" + showModal);
    // setShowModal(!property.openModal);
    setShowModal(false);
    console.log("closeModal - Depois:" + showModal);
  }

  async function Save() {
    if (vaccineID) {
      const response = await fetch("/api/vaccination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationLocal })
      });
    }
    else {
      const response = await fetch("/api/vaccination", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ vaccineID, userID, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationLocal })
      });
    }
  }

  return (
    <>
      { showModal &&
        <div className="flex justify-center h-screen items-center antialiased">
          <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
            <div className="flex flex-row justify-between p-6 bg-white rounded-tl-lg rounded-tr-lg">
              <p className="font-semibold text-gray-800">Cadastro de Vacina</p>
              <button onClick={() => closeModal()}>X</button>
            </div>

            <hr />

            <div className="flex flex-col bg-white border-b items-center mt-5 mb-3 space-x-4">
              <Input
                label="Nome da Vacina"
                id="vaccineName"
                value={vaccineName}
                onChange={e => setVaccineName(e.target.value)}
                placeholder="Digite o nome da vacina"
                type="text" />

              <Input
                label="Tipo da Vacina"
                id="vaccineType"
                value={vaccineType}
                onChange={e => setVaccineType(e.target.value)}
                placeholder="Digite o tipo da vacina"
                type="text" />

              <Input
                label="Fabricante da Vacina"
                id="vaccineManufacturer"
                value={vaccineManufacturer}
                onChange={e => setVaccineManufacturer(e.target.value)}
                placeholder="Digite o fabricante da vacina"
                type="text" />

              <div className="inline-flex flex-w flex-row items-center justify-items-center">
                <select>
                  <option value="1">1ª Dose</option>
                  <option value="2">2ª Dose</option>
                  <option value="3">3ª Dose</option>
                  <option value="R1">1ª reforço</option>
                  <option value="R2">2ª reforço</option>
                </select>

                <Input
                  label="Dose da vacina"
                  id="vaccineDoses"
                  value={vaccineDoses}
                  onChange={e => setVaccineDoses(e.target.value)}
                  placeholder=""
                  type="date" />
              </div>

              <Input
                label="Local da vacinação"
                id="vaccinationLocal"
                value={vaccineDoses}
                onChange={e => setVaccinationLocal(e.target.value)}
                placeholder="Digite o posto/hospítal no qual você tomou a vacina"
                type="text" />

              <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <button className="font-semibold text-gray-600" onClick={() => closeModal()}>Cancel</button>
                <button className="px-4 py-2 text-white font-semibold bg-blue-500 rounded" onClick={() => Save()}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}