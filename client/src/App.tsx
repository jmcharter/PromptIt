import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { loginUser, validateToken } from './api';

import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Prompts from './components/Prompts';
import { AxiosResponse } from 'axios';
import { ValidateResponse } from './models/ResponseModels';



const App = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const getUserDetails = async () => {
        const token = localStorage.getItem("access-token");
        try {
            if (token) {
                const res: AxiosResponse<ValidateResponse> = await validateToken(token);
                if (res) {
                    console.log(res);
                    setCurrentUser(res.data.userdata);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            <Header pages={['Profile', 'Prompts']} />
            <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="prompts" element={<Prompts />} />
            </Routes>
        </>


    );
};

export default App;