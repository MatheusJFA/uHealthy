import React from 'react';
import Router from 'next/router';

interface IProfile {
    name: string;
    cpf: string;
}

export function Profile(property: IProfile) {

    function GoToVaccineTable() {
        Router.push('/table');
    }

    return (
        <div className="mx-auto user-information flex flex-row items-center border-4 border-red-500">
            <button onClick={() => GoToVaccineTable()}>
                <img src="../man.svg" className=" w-32" alt="Perfil user" />
                <div className="user-dates pl-6">
                    <div className="font-semibold">Nome do Usuário:</div>
                    <div className="user-name">{property.name} </div>
                    <div className="font-semibold">CPF: </div>
                    <div className="user-cpf"> {property.cpf} </div>
                </div>
            </button>
        </div>
    )
}