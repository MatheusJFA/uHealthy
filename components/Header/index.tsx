import React from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Messages from '../../utils/messages';

interface IHeader {
    name?: string,
    cpf?: string,
    onClick?: any,
    showBack?: boolean
}



export default function Header(property: IHeader) {
    function logOut() {
        toast.success(Messages.MSG_S002);
        localStorage.removeItem("JWT");
        Router.push('/');
    }
    function back() {
        Router.back();
    }
    return (
        <header className="header-login">
            <div className="nav-page">
                <img className="user-perfil" src="../man.svg" alt="Imagem padrão de usuário" />
                <div>
                    <div className="user-name">{property.name}</div>
                    <div className="user-id">{property.cpf}</div>
                </div>
            </div>
            <div className="header-actions">
                {property.showBack && <button className="bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" type="button" onClick={() => back()}> Voltar </button>}
                <button className="bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" type="button" onClick={() => logOut()}> Sair </button>
            </div>
        </header>
    )
}