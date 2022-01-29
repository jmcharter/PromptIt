import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { UserData } from '../models/DataModels';


interface Props {
    children?: React.ReactNode;
    userData?: Object;
}

interface AuthContextType {
    currentUser: UserData;
    setCurrentUser: (user: UserData) => void;
}

const AuthContext = React.createContext<AuthContextType>({
    currentUser: { displayName: "", username: "", email: "" },
    setCurrentUser: () => { }
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children, userData }: Props): ReactElement {
    const [currentUser, setCurrentUser] = useState<UserData>({ displayName: "", username: "", email: "" });

    useEffect(() => {
        const getUser = () => {

        };
    }, []);

    return (
        < AuthContext.Provider value={{ currentUser, setCurrentUser }} >
            {children}
        </AuthContext.Provider>
    );
};
