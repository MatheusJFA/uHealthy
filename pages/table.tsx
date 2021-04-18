import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { toast } from 'react-toastify';
import Messages from '../utils/messages';

export default function Table() {
    useEffect(() => {
        var jwt = localStorage.getItem("JWT");

        if (jwt === undefined) {
            toast.error(Messages.MSG_E006);
            Router.push('/');
        } 
    }, []);


    return (
        <>
            <div className="header-login">
                <div className="nav-page">
                    <img className="user-perfil" src="../man.svg" alt="Imagem padrão de usuário" />
                    <div>
                        <div className="user-name">Vinícius Marinho</div>
                        <div className="user-id">123.456.890-12</div>
                    </div>
                </div>
                <button className=" bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" type="button"> Sair </button>
            </div>
             
            <nav className="navbar">
                <ul>
                    <li><a href="#"> Vacinas Obrigatórias </a></li>
                    <li><a href="#"> Vacinas de Campanhas </a></li>
                </ul>
            </nav>
            <div className="flex-grow">
                <div className="table-vacination">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Vacinas</th>
                                <th scope="col">Proteção Contra</th>
                                <th scope="col">Idade Recomendada</th>
                                <th scope="col">1º Dose Data</th>
                                <th scope="col">2º Dose Data</th>
                                <th scope="col">3º Dose Data</th>
                                <th scope="col">1º Reforço Data</th>
                                <th scope="col">2º Reforço Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row" data-label="Vacinas">BCG</td>
                                <td data-label="Proteção Contra">Formas Graves de tuberculose</td>
                                <td data-label="Idade Recomendada">Ao Nascer</td>
                                <td data-label="1º Dose Data">01/01/2001</td>
                                <td data-label="2º Dose Data"> 1 </td>
                                <td data-label="3º Dose Data"> 2 </td>
                                <td data-label="1º Reforço Data"> 3 </td>
                                <td data-label="2º Reforço Data"> 4 </td>
                            </tr>

                            <tr>
                                <td scope="row" data-label="Vacinas">BCG</td>
                                <td data-label="Proteção Contra">Formas Graves de tuberculose</td>
                                <td data-label="Idade Recomendada">Ao Nascer</td>
                                <td data-label="1º Dose Data">01/01/2001</td>
                                <td data-label="2º Dose Data"> 1 </td>
                                <td data-label="3º Dose Data"> 2 </td>
                                <td data-label="1º Reforço Data"> 3 </td>
                                <td data-label="2º Reforço Data"> 4 </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-end m-8">
                <button type="button" className="hover:cursor-pointer hover:shadow-md rounded-full border-none w-12">
                    <img src="/remove_circle_outline.svg"/>
                </button>
                <button type="button" className="hover:cursor-pointer hover:shadow-md rounded-full border-none w-12">
                    <img src="/add_circle_outline.svg"/>
                </button>
            </div>
           
        </>
    )
}