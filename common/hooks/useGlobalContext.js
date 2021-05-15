import React , {useContext} from 'react';
import {GlobalContext} from '../../contexts/GlobalContext';

export function useGlobalContext() {
    const {
        changeLoading,
        loading
    } = useContext(GlobalContext);

    return {
        changeLoading,
        loading
    };
}