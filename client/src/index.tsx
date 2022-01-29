import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import { AuthContextProvider } from './contexts/AuthContext';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <AuthContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthContextProvider>,

    document.getElementById('root')

);