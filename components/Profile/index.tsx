import React from 'react';

interface IProfile {
    name: string;
    cpf: string;
}

export function Profile(property: IProfile) {
    return (
        <div className="user-information flex flex-row items-center ">
            <img src="../man.svg" className=" w-32" alt="Perfil user" />
            <div className="user-dates pl-6">
                <div className="font-semibold">Nome do Usuário:</div>
                <div className="user-name">{property.name} </div>
                <div className="font-semibold">CPF: </div>
                <div className="user-cpf"> {property.cpf} </div>
            </div>
        </div>
    )
}