import React, { useState } from 'react';


interface IDependents {
    nameDependent?: string
}

export default function Dependents(property: IDependents) {

    return (
        <div className="border-red-500 w-40  border-solid border-2 flex flex-col  m-5 items-center rounded relative">
            <img className="w-full p-1" src="../man.svg" alt="" />
            <div className=" p-2">
                <p className="pb-1">{property.nameDependent}</p>
            </div>
        </div>
    )
}