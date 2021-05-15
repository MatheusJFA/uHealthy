import React from 'react'
import { useGlobalContext } from '../../common/hooks/useGlobalContext';


export default function Loading() {
    const { loading } = useGlobalContext();

    return (
        <>
            {loading && <div className="loading flex justify-center items-center"  >
                <svg className="svg-loading animate-spin h-10 w-10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" />
                </svg>
            </div>}
        </>

    );
}