import React, { ReactElement, useContext, useState } from 'react';

interface Props {
    children?: React.ReactNode;
}

const AuthContext = React.createContext([]);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: Props): ReactElement {
    // const [currentUser, setCurrentUser] = useState();
    // const value = currentUser;
    return (
        <></>
        //     < AuthContext.Provider value={value} >
        //         {children}
        //     </AuthContext.Provider>
    );
};
