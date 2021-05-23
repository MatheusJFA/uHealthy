import React, { useState } from 'react';


export function Dependents() {
    const userDates = {
        "NomeFilho":"Boca de sacolinha"
    }

    return (
        <div className="flex">

            <div className="border-red-500 border-solid border-2 flex flex-col  m-5 items-center rounded relative">
                <img className="w-10/12 p-1" src="../man.svg" alt="" />
                <div className=" p-2">
                    <p>{userDates.NomeFilho}</p>
                </div>
            </div>

            <div className="user-add transition duration-75 ease-in-out border-red-500 hover:border-gray-500 border-solid border-2 flex flex-col  m-5 items-center rounded relative">
                <img className="w-10/12 p-1" src="../man.svg" alt="" />
                <div className=" p-2">
                    <p>{userDates.NomeFilho}</p>
                </div>
                <div className=" bg-gray-500  opacity-70 absolute w-full h-full"></div>
            </div>

        </div>
    )
}