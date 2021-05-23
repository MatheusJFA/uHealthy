
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Dependents } from '../components/Depentends';
import { Profile } from '../components/Profile';
import { toast } from 'react-toastify';
import { Router } from 'next/router';
import Messages from '../utils/messages';


export default function Dependent() {


    function logOut() {
        toast.success(Messages.MSG_S002);
        localStorage.removeItem("JWT");
    }

    return (
        <>
            <Header onClick={() => logOut()}/>
            <div className="flex flex-col flex-grow pl-8 pr-8">
                <div className="flex flex-col">
                    <h1 className="font-semibold mb-4 mt-4"> Suas Informações: </h1>
                    <Profile />
                </div>

                <div>
                    <h2 className="mt-4 font-semibold"> Dependentes: </h2>
                    <Dependents />
                </div>
            </div>
        </>
    )
}