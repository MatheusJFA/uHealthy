import React, { useRef, useEffect, useCallback, useState } from 'react';
import Input from '../../Input';

interface IModal {
  userID: string;
  vaccineID?: string;
  showModal: any;
}

export default function Modal(property: IModal) {
  const userID = property.userID;
  const vaccineID = property.vaccineID;

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

  async function Save() {
    if (vaccineID) {
      const response = await fetch("/api/vaccination", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ vaccineID, userID, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationLocal })
      });
    }
    else {
      const response = await fetch("/api/vaccination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationLocal })
      });

    }
  }

  function close() {
    property.showModal(false);
  }

  return (
    <>
      {property.showModal &&
        <div className="background">
          <div className="conteudoModal">
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

            <div className="flex flex-row items-center justify-items-center">
              <Input
                label="1ª Dose"
                id="vaccineDoses"
                value={vaccineDoses}
                onChange={e => setVaccineDoses(e.target.value)}
                placeholder=""
                type="date" />

              <Input
                label="2ª Dose"
                id="vaccineDoses"
                value={vaccineDoses}
                onChange={e => setVaccineDoses(e.target.value)}
                placeholder=""
                type="date" />

              <Input
                label="3ª Dose"
                id="vaccineDoses"
                value={vaccineDoses}
                onChange={e => setVaccineDoses(e.target.value)}
                placeholder=""
                type="date" />
            </div>

            <div className="flex flex-row items-center justify-items-center">
              <Input
                label="1ª Dose de Reforço"
                id="vaccineDoses"
                value={vaccineDoses}
                onChange={e => setVaccineDoses(e.target.value)}
                placeholder=""
                type="date" />

              <Input
                label="2ª Dose de Reforço"
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
              <button className="font-semibold text-gray-600" onClick={() => close()}>Cancel</button>
              <button className="px-4 py-2 text-white font-semibold bg-red-500 rounded" onClick={() => Save()}>Salvar</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}
