
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

import { Profile } from '../components/Profile';
import DependentList from '../components/DependentList';


export default function Dependent() {

    const dependentList = [
        { id: 1, name: "Leanne Graham" },
        { id: 2, name: "Ervin Howell" },
        { id: 3, name: "Clementine Bauch" },
        { id: 4, name: "Patricia Lebsack" }
    ];


    return (
        <>
            <Header />
            <div className="flex flex-col flex-grow pl-8 pr-8">
                <div className="flex flex-col">
                    <h1 className="font-semibold mb-4 mt-4"> Suas Informações: </h1>
                    <Profile />
                </div>

                <div>
                    <h2 className="mt-4 font-semibold"> Dependentes: </h2>
                    <div className="flex">
                        <DependentList listDependents={dependentList} />
                        <div className="user-add transition duration-75 w-40 ease-in-out border-gray-500 hover:border-gray-600 border-solid border-2 flex flex-col  m-5 items-center rounded relative" >
                            <img className="w-full p-1 " src="../man.svg" alt="" />
                            <div className=" p-2">
                                <p className="pb-1">Adicionar</p>
                            </div>
                            <div className=" bg-gray-300  z-0  opacity-90  hover:opacity-80  active:bg-black transition ease-in-out rounded absolute flex items-center  justify-center w-full h-full">
                                <img src="../add_circle_outline_black.svg" className="absolute z-10" alt="add more depentent" draggable="false" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}