import React, { useState } from 'react';


export function Dependents() {
    const userDates = {
        "NomeFilho": "Boca de sacolinha"
    }

    return (
        <div className="flex">

            <div className="border-red-500 border-solid border-2 flex flex-col  m-5 items-center rounded relative">
                <img className="w-10/12 p-1" src="../man.svg" alt="" />
                <div className=" p-2">
                    <p>{userDates.NomeFilho}</p>
                </div>
            </div>

            <div className="user-add transition duration-75 ease-in-out border-gray-500 hover:border-gray-600 border-solid border-2 flex flex-col  m-5 items-center rounded relative">
                <img className="w-10/12 p-1" src="../man.svg" alt="" />
                <div className=" p-2">
                    <p>{userDates.NomeFilho}</p>
                </div>
                <div className=" bg-gray-300  z-0  opacity-90  hover:opacity-80  active:bg-black transition ease-in-out rounded absolute flex items-center  justify-center w-full h-full">
                    <img src="../add_circle_outline_black.svg" className="absolute z-10" alt="add more depentent" draggable="false" />
                </div>
            </div>

        </div>
    )
}