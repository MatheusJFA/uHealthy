import React from 'react';
import Dependents from '../Dependents';

interface IDependents {
    listDependents?: any
}

export default function DependentsList(property: IDependents) {

    return (
        <>
            {property.listDependents.map(c => <Dependents key={c.id} nameDependent={c.name} />)}
        </>
    )
}