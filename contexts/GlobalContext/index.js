import React , {createContext, useState , useCallback} from 'react';

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [loading,setLoading] = useState(false);

    const changeLoading = useCallback((visible) => {
        setLoading(visible);
      }, []);

    return (
        <GlobalContext.Provider value={{
            changeLoading,
            loading}}>{children}
        </GlobalContext.Provider>
    ) 
}