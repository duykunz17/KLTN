import React from 'react';

// import Views
import LoginPage from "./views/LoginPage";
import NotFoundpage from "./views/NotFoundpage";

const ROUTERS = [
    {
        path: '/',
        exact: true,
        main: () => <LoginPage />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundpage />
    }
]

export default ROUTERS;