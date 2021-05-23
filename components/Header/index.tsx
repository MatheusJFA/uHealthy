import React from 'react';

interface IHeader {
    name?: string,
    cpf?: string,
    onClick?: any
}

export default function Header(property: IHeader) {
    return (
        <header className="header-login">
            <div className="nav-page">
                <img className="user-perfil" src="../man.svg" alt="Imagem padrão de usuário" />
                <div>
                    <div className="user-name">{property.name}</div>
                    <div className="user-id">{property.cpf}</div>
                </div>
            </div>
            <button className="bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" type="button" onClick={property.onClick}> Sair </button>
        </header>
    )
}