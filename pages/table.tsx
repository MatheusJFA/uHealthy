import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Messages from '../utils/messages';

import { env } from "process";
import jwt from 'jsonwebtoken';


export default function Table() {
    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");
    const [id, setID] = useState("");

    useEffect(() => {
        var jwtData = localStorage.getItem("JWT");

        const data = jwt.decode(jwtData);
        setName(data.name);
        setCPF(data.cpf);
        setID(data.id);

        if (jwtData === undefined) {
            toast.error(Messages.MSG_E006);
            Router.push('/');
        }
    }, []);

    useEffect(() => {
        async function getVaccines() {
            console.log(id);
            const response = await fetch(`/api/vaccination`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
          });
        }
        getVaccines();
    }, [])


    function LogOut() {
        toast.success(Messages.MSG_S002);
        localStorage.removeItem("JWT");
        Router.push('/');
    }

    return (
        <>
            <div className="header-login">
                <div className="nav-page">
                    <img className="user-perfil" src="../man.svg" alt="Imagem padrão de usuário" />
                    <div>
                        <div className="user-name">{name}</div>
                        <div className="user-id">{cpf}</div>
                    </div>
                </div>
                <button className="btnPrimary" type="button" onClick={() => LogOut()}> Sair </button>
            </div>

            <nav className="navbar">
                <ul>
                    <li><a href="#"> Vacinas Obrigatórias </a></li>
                    <li><a href="#"> Vacinas de Campanhas </a></li>
                </ul>
            </nav>

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
        </>
    )
}