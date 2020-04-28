import React from 'react';

// import Views
import LoginPage from "./views/LoginPage";
import NotFoundpage from "./views/NotFoundpage";

// test info
import Info from "./views/Info";

const ROUTERS = [
    {
        path: '/',
        exact: true,
        main: ({history}) => <LoginPage history={history}/>
    },
    {
        path: '/info',
        exact: false,
        main: () => <Info />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundpage />
    }
]

export default ROUTERS;