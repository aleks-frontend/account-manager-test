import React, { createContext, useState } from 'react';

export const WarningContext = createContext();

const WarningContextProvider = (props) => {
    const [warningVisible, setWarningVisible] = useState(false);
    
    return (
        <WarningContext.Provider value={{ warningVisible, setWarningVisible }}>
            {props.children}
        </WarningContext.Provider>
    );
};

export default WarningContextProvider;
