import { Router } from 'next/router';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Messages from '../../../utils/messages';
import Input from '../../Input';
import ToggleButton from '../../ToggleButton';

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


  const [vaccineFirstDoses, setVaccineFirstDoses] = useState();
  const [vaccineSecondDoses, setVaccineSecondDoses] = useState();
  const [vaccineThirdDoses, setVaccineThirdDoses] = useState();
  const [vaccineFirstReinforcementDoses, setVaccineFirstReinforcementDoses] = useState();
  const [vaccineSecondReinforcementDoses, setVaccineSecondReinforcementDoses] = useState();

  useEffect(() => {
    if (vaccineID) {

    }
  }, []);

  async function Save(event) {
    event.preventDefault();

    const doses = [vaccineFirstDoses, vaccineSecondDoses, vaccineThirdDoses, vaccineFirstReinforcementDoses, vaccineSecondReinforcementDoses];
   
    setVaccineDoses(doses);
    console.log(vaccineDoses);

    if (vaccineID) {
      try {
        const response = await fetch("/api/vaccination", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ vaccineID, userID, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationLocal })
        });


        const result = await response.json();

        if (result.error)
          toast.error(result.error);
        else {
          toast.success(Messages.MSG_SUCCESS_MESSAGE("Vacina", "atualizada"));
          close();
          return result;
        }
      } catch (error) {
        toast.error(error);
      }
    }
    else {
      try {
        const response = await fetch("/api/vaccination", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userID, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationLocal })
        });

        const result = await response.json();

        if (result.error)
          toast.error(result.error);
        else {
          toast.success(Messages.MSG_SUCCESS_MESSAGE("Vacina", "cadastrada"));
          close();
          return result;
        }
      }
      catch (error) {
        toast.error(error);
      }
    }
  }

  function close() {
    property.showModal(false);
  }

  return (
    <>
      {property.showModal &&
        <form>
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

              <div className="flex flex-row w-full gap-10 items-center justify-items-center">
                <Input
                  label="Fabricante da Vacina"
                  id="vaccineManufacturer"
                  value={vaccineManufacturer}
                  onChange={e => setVaccineManufacturer(e.target.value)}
                  placeholder="Digite o fabricante da vacina"
                  type="text" />

                  <ToggleButton value={vaccineMandatory} setValue={setVaccineMandatory}/>
              </div>

              <div className="flex flex-row gap-10 items-center justify-items-center">
                <Input
                  label="1ª Dose"
                  id="vaccineFirstDose"
                  value={vaccineFirstDoses}
                  onChange={e => setVaccineFirstDoses(e.target.value)}
                  placeholder=""
                  type="date" />

                <Input
                  label="2ª Dose"
                  id="vaccineSecondDose"
                  value={vaccineSecondDoses}
                  onChange={e => setVaccineSecondDoses(e.target.value)}
                  placeholder=""
                  type="date" />

                <Input
                  label="3ª Dose"
                  id="vaccineThirdDose"
                  value={vaccineThirdDoses}
                  onChange={e => setVaccineThirdDoses(e.target.value)}
                  placeholder=""
                  type="date" />
              </div>

              <div className="flex flex-row gap-10 items-center justify-items-center">
                <Input
                  label="1ª Dose de Reforço"
                  id="vaccineFirstReinforcementDoses"
                  value={vaccineFirstReinforcementDoses}
                  onChange={e => setVaccineFirstReinforcementDoses(e.target.value)}
                  placeholder=""
                  type="date" />

                <Input
                  label="2ª Dose de Reforço"
                  id="vaccineSecondReinforcementDoses"
                  value={vaccineSecondReinforcementDoses}
                  onChange={e => setVaccineSecondReinforcementDoses(e.targetValue)}
                  placeholder=""
                  type="date" />
              </div>

              <Input
                label="Local da vacinação"
                id="vaccinationLocal"
                value={vaccinationLocal}
                onChange={e => setVaccinationLocal(e.target.value)}
                placeholder="Digite o posto/hospítal no qual você tomou a vacina"
                type="text" />

              <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <button className="font-semibold text-gray-600" onClick={() => close()}>Cancel</button>
                <button className="px-4 py-2 text-white font-semibold bg-red-500 rounded" onClick={(event) => Save(event)}>Salvar</button>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
}