import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useGlobalContext } from '../../../common/hooks/useGlobalContext';

import Messages from '../../../utils/messages';
import Input from '../../Input';
import ToggleButton from '../../ToggleButton';


interface IModal {
  userID: string;
  vaccineId?: any;
  showModal: any;
}

export default function Modal(property: IModal) {
  const userId = property.userID;
  const vaccineId = property.vaccineId;

  const [loading, setLoading] = useState(false);

  const [vaccineName, setVaccineName] = useState("");
  const [vaccineType, setVaccineType] = useState("");
  const [vaccineManufacturer, setVaccineManufacturer] = useState("");
  const [vaccineMandatory, setVaccineMandatory] = useState(false);
  const [vaccinationLocal, setVaccinationLocal] = useState("");
  const { changeLoading } = useGlobalContext();

  let [vaccineDoses, setVaccineDoses] = useState([]);

  async function validate() {
    const schema = Yup.object().shape({
      userId: Yup.number().required(Messages.MSG_E003("userId")),
      vaccineName: Yup.string().required(Messages.MSG_E003("vaccineName")),
      vaccineType: Yup.string().required(Messages.MSG_E003("vaccineType")),
      vaccineManufacturer: Yup.string(),
      vaccineDoses: Yup.array().of(Yup.string()),
      vaccineMandatory: Yup.boolean().required(Messages.MSG_E003("vaccineMandatory")),
      vaccinationLocal: Yup.string(),
    });

    var errorsList = [];

    try {
      var errors = await schema
        .validate({ userId, vaccineName, vaccineType, vaccineManufacturer, vaccineDoses, vaccineMandatory, vaccinationLocal }, { abortEarly: false })
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


    if (!(await schema.isValid({ userId, vaccineName, vaccineType, vaccineManufacturer, vaccineDoses, vaccineMandatory, vaccinationLocal }))) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    async function getVaccine() {
      changeLoading(true);
      setLoading(true);
      if (vaccineId) {
        const response = await fetch(`/api/vaccination/vaccine?id=${vaccineId}`);
        const data = await response.json();

        if (data.error)
          toast.error(data.error);
        else {
          const vaccination = data.vaccination;
          const doses = vaccination.vaccineDoses;

          setVaccineName(vaccination.vaccineName);
          setVaccineType(vaccination.vaccineType);
          setVaccineManufacturer(vaccination.vaccineManufacturer);
          setVaccineMandatory(vaccination.vaccineMandatory);
          setVaccinationLocal(vaccination.vaccinationLocal);

          setVaccineDoses(doses);
          changeLoading(false);
          setLoading(false);
        }
      }
    }
    if (vaccineId)
      getVaccine();
  }, [vaccineId]);

  async function discard() {
    try {
      const response = await fetch("/api/vaccination", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: vaccineId })
      });

      const result = await response.json();

      if (result.error)
        toast.error(result.error);
      else {
        toast.success(Messages.MSG_SUCCESS_MESSAGE("Vacina", "atualizada"));
        property.showModal(false);
        return result;
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async function save(event) {
    event.preventDefault();

    var validation = await validate();

    if (validation) {
      if (vaccineId) {
        try {
          setLoading(true);
          changeLoading(true);
          
          const response = await fetch("/api/vaccination", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: vaccineId, userId, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationLocal })
          });

          const result = await response.json();

          if (result.error)
            toast.error(result.error);
          else {
            toast.success(Messages.MSG_SUCCESS_MESSAGE("Vacina", "atualizada"));
            property.showModal(false);
            setLoading(false);
            changeLoading(false);
            return result;
          }
        } catch (error) {
          toast.error(error);
        }
      }
      else {
        try {
          setLoading(true);
          changeLoading(true);
          const response = await fetch("/api/vaccination", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, vaccineName, vaccineType, vaccineManufacturer, vaccineMandatory, vaccineDoses, vaccinationLocal })
          });

          const result = await response.json();

          if (result.error)
            toast.error(result.error);
          else {
            toast.success(Messages.MSG_SUCCESS_MESSAGE("Vacina", "cadastrada"));
            property.showModal(false);
            setLoading(false);
            changeLoading(false);
            return result;
          }
        }
        catch (error) {
          toast.error(error);
        }
      }
    } else {
      return toast.warning(Messages.MSG_A002);
    }
  }

  function close(event) {
    event.preventDefault();
    property.showModal(false);
  }

  function addDoses(event, position) {
    const copyArray = [...vaccineDoses];
    copyArray[position] = event.target.value;
    setVaccineDoses(copyArray);
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

                <ToggleButton value={vaccineMandatory} setValue={setVaccineMandatory} />
              </div>

              <div className="flex flex-row gap-10 items-center justify-items-center">
                <Input
                  label="1ª Dose"
                  id="vaccineFirstDose"
                  value={vaccineDoses[0] !== null ? vaccineDoses[0] : " "}
                  onChange={event => addDoses(event, 0)}
                  placeholder=""
                  type="date" />

                <Input
                  label="2ª Dose"
                  id="vaccineSecondDose"
                  value={vaccineDoses[1] !== null ? vaccineDoses[1] : " "}
                  onChange={event => addDoses(event, 1)}
                  placeholder=""
                  type="date" />

                <Input
                  label="3ª Dose"
                  id="vaccineThirdDose"
                  value={vaccineDoses[2] !== null ? vaccineDoses[2] : " "}
                  onChange={event => addDoses(event, 2)}
                  placeholder=""
                  type="date" />
              </div>

              <div className="flex flex-row gap-10 items-center justify-items-center">
                <Input
                  label="1ª Dose de Reforço"
                  id="vaccineFirstReinforcementDoses"
                  value={vaccineDoses[3] !== null ? vaccineDoses[3] : " "}
                  onChange={event => addDoses(event, 3)}
                  placeholder=""
                  type="date" />

                <Input
                  label="2ª Dose de Reforço"
                  id="vaccineSecondReinforcementDoses"
                  value={vaccineDoses[4] !== null ? vaccineDoses[4] : " "}
                  onChange={event => addDoses(event, 4)}
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
                <button className="font-semibold text-gray-600" onClick={(event) => close(event)}>Cancel</button>
                <div className="flex flex-row items-center p-5 bg-white border-t gap-10 border-gray-200 rounded-bl-lg rounded-br-lg">
                  {vaccineId && <button className="px-4 py-2 text-red-500 font-semibold bg-white rounded" onClick={(event) => discard()}>Deletar</button>}
                  <button className="px-4 py-2 text-white font-semibold bg-red-500 rounded" onClick={(event) => save(event)}>Salvar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
}