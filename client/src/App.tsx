import React, { useEffect, useState } from 'react';
import TestButton from './components/TestButton';
import Signup from './components/Signup';
// import { Container, AppBar, Typography, Grow, Grid, ButtonGroup, Button } from '@material-ui/core';

import Header from './components/Header';

var pages = ['Home', 'Popular', 'About'];

const App = () => {

    // const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <>
            {/* <Header pages={pages} loggedIn={loggedIn} />
            <TestButton type="submit">Hello</TestButton> */}
            <Signup />
        </>
    );
};

export default App;