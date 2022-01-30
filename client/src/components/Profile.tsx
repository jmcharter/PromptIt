import React, { ReactElement } from 'react';
import { getUser } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface User {
    name: string;
}

const isLoggedIn = () => {
    return !!localStorage.getItem("access-token");
};


function Profile(): ReactElement {
    const { currentUser } = useAuth();
    // if (!isLoggedIn()) {
    //     return <Navigate to="login" />;
    // }
    return (
        <div>
            {!isLoggedIn() && <Navigate to="login" />}
            <h1>Hello {currentUser.displayName}</h1>
        </div>
    );
}

export default Profile;