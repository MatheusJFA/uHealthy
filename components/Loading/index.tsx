import React from 'react'
import { LinearProgress } from '@material-ui/core';
import { useGlobalContext } from '../../common/hooks/useGlobalContext';


export default function Loading() {
    const { loading } = useGlobalContext();

    return (
        <>
            {loading && <div className="loading flex justify-center items-center"  >
              <LinearProgress color="secondary" />
            </div>}
        </>

    );
}