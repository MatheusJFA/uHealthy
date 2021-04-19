import React, { useEffect, useState } from "react";
import Input from "../Input";

interface IModal {
  userID: number;
  vaccineID: number;
}

export default function Modal(property: IModal) {
  const userID = property.userID;
  const vaccineID = property.vaccineID;

  const [showModal, setShowModal] = useState(false);

  const [vaccineName, setVaccineName] = useState();
  const [vaccineType, setVaccineType] = useState();
  const [vaccineManufacturer, setVaccineManufacturer] = useState();
  const [vaccineMandatory, setVaccineMandatory] = useState();
  const [vaccineDoses, setVaccineDoses] = useState();
  const [vaccinationLocal, setVaccinationLocal] = useState();

  useEffect(() => {
    if (vaccineID) {

    }
  }, []);

  async function Save() {
    if (vaccineID) {
      const response = await fetch("/api/vaccination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationDate, vaccinationLocal })
      });
    }
    else {
      const response = await fetch("/api/vaccination", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ vaccineID, userID, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationDate, vaccinationLocal })
      });
    }
  }


  return (
    <>
      { showModal &&
        <div className="flex justify-center h-screen items-center bg-gray-200 antialiased">
          <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
            <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
              <p className="font-semibold text-gray-800">Cadastro de Vacina</p>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>

            <hr />

            <div className="flex items-center mt-5 mb-3 space-x-4">
              <Input 
                label="vaccineName"
                id="vaccineName"
                value={vaccineName} 
                onChange={e => setVaccineName(e.target.value)}
                placeholder="Digite o nome da vacina" 
                type="text"/>

              <Input 
                label="vaccineType"
                id="vaccineType"
                value={vaccineType} 
                onChange={e => setVaccineType(e.target.value)} 
                placeholder="Digite o tipo da vacina" 
                type="text"/>

              <Input 
                label="vaccineManufacturer" 
                id="vaccineManufacturer" 
                value={vaccineManufacturer} 
                onChange={e => setVaccineManufacturer(e.target.value)} 
                placeholder="Digite o fabricante da vacina" 
                type="text"/>
              
              <select>
                <option value="1">1ª Dose</option>
                <option value="2">2ª Dose</option>
                <option value="3">3ª Dose</option>
                <option value="R1">1ª reforço</option>
                <option value="R2">2ª reforço</option>
              </select>    

              <Input 
                label="vaccineDoses" 
                id="vaccineDoses" 
                value={vaccineDoses} 
                onChange={e => setVaccineDoses(e.target.value)} 
                placeholder="" 
                type="date"/>

              <Input 
                label="vaccinationLocal"
                id="vaccinationLocal"
                value={vaccineDoses}
                onChange={e => setVaccinationLocal(e.target.value)} 
                placeholder="Digite o posto/hospítal no qual você tomou a vacina" 
                type="text"/>

              <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <button className="font-semibold text-gray-600" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="px-4 py-2 text-white font-semibold bg-blue-500 rounded" onClick={() => Save()}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}