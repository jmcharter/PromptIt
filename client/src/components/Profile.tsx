import React, { ReactElement } from 'react';
import { getUser } from '../api';
import { useAuth } from '../contexts/AuthContext';

interface User {
    name: string;
}

function Profile(): ReactElement {
    const { currentUser } = useAuth();
    return (
        <div>
            <h1>Hello {currentUser.displayName}</h1>
        </div>
    );
}

export default Profile;