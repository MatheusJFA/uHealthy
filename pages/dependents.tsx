
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Router from 'next/router';

import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';

import { Profile } from '../components/Profile';
import Modal from '../components/Modal'
import ModalDependent from '../components/Modal/Dependent'
import Messages from '../utils/messages';

import { useGlobalContext } from '../common/hooks/useGlobalContext';

export default function Dependent() {
    const [userID, setUserID] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");
    const [dependentes, setDependentes] = useState([]);
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
            setName(data.name);
            setCPF(data.cpf);
            setUserID(data.id);
        }
        verification();
    }, [changeLoading]);

    useEffect(() => {
        async function getDependents() {
            changeLoading(true);
            setLoading(true);
            const response = await fetch(`/api/dependent?userId=${userID}`);
            const data = await response.json();

            setDependentes(data.dependentes);

            changeLoading(false);
            setLoading(false);
        }

        getDependents();
    }, [changeLoading, showModal, userID]);

    function logOut() {
        toast.success(Messages.MSG_S002);
        localStorage.removeItem("JWT");
        Router.push('/');
    }

    function openModal() {
        setShowModal(!showModal);
    }

    const renderDependents = (dependent) => {
        return (
            <div className="border-red-500 w-40  border-solid border-2 flex flex-col  m-5 items-center rounded relative">
                <img className="w-full p-1" src="../man.svg" alt="" />
                <div className=" p-2">
                    <p className="pb-1">{dependent.name}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header onClick={() => logOut()} />
            <div className="flex flex-col flex-grow pl-8 pr-8">
                <div className="flex flex-col">
                    <h1 className="font-semibold mb-4 mt-4"> Suas Informações: </h1>
                    <Profile nome={name} cpf={cpf} />
                </div>

                <div>
                    <h2 className="mt-4 font-semibold"> Dependentes: </h2>
                    <div className="flex">

                        {dependentes?.map((renderDependents))}

                        <div className="user-add transition duration-75 w-40 ease-in-out border-gray-500 hover:border-gray-600 border-solid border-2 flex flex-col  m-5 items-center rounded relative" >
                            <img className="w-full p-1 " src="../man.svg" alt="" />
                            <div className=" p-2">
                                <p className="pb-1">Adicionar</p>
                            </div>
                            <div className=" bg-gray-300  z-0  opacity-90  hover:opacity-80  active:bg-black transition ease-in-out rounded absolute flex items-center  justify-center w-full h-full">
                                <button onClick={() => openModal()}>
                                    <img src="../add_circle_outline_black.svg" className="absolute z-10" alt="add more depentent" draggable="false" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showModal}
                title="Cadastrar nova vacina"
                onCancel={() => openModal()}
                actions=""
                form={<ModalDependent showModal={setShowModal} userID={userID} />}
            />
        </>
    )
}