import React, { useState } from 'react';

export default function Table() {

    return (
        <>
            <div className="header-login">
                <div className="nav-page">
                    <img className="user-perfil" src="../man.svg" alt="Imagem padrão de usuário" />
                    <div>
                        <div className="user-name">Boca de Sacola</div>
                        <div className="user-id">123.456.890-12</div>
                    </div>
                </div>
                <button className="btnPrimary" type="button"> Sair </button>
            </div>

            <div className="table-vacination">
                <table>
                    <caption>Vacinas Obrigatórias</caption>
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