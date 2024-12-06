import React, { createContext, useState } from 'react';

export const SignsContext = createContext();

export const SignsProvider = ({ children }) => {
    const [signs, setSigns] = useState([]);

    return (
        <SignsContext.Provider value={{ signs, setSigns }}>
            {children}
        </SignsContext.Provider>
    );
};
