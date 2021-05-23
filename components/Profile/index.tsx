import React from 'react';

export function Profile() {

    const userDates = {
        "CPF":"012.345.678-90",
        "Nome":"Pai Bocas de Sacola"
    }

    return (
        <div className="user-information flex flex-row items-center ">
            <img src="../man.svg" className=" w-32" alt="Perfil user" />
            <div className="user-dates pl-6">
                <div className="font-semibold">Nome do Usuário:</div>
                <div className="user-name">{userDates.Nome} </div>
                <div className="font-semibold">CPF: </div>
                <div className="user-cpf"> {userDates.CPF} </div>
            </div>
        </div>
    )
}