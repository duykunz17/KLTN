import React from 'react';

// import Views
import LoginPage from "./views/LoginPage";
import NotFoundpage from "./views/NotFoundpage";

// test info
import Info from "./views/Info";
import HomePage from './views/HomePage';
import SignUpPage from './views/SignUpPage';
import PlaceDetailPage from './views/PlaceDetailPage';

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
        path: '/homepage',
        exact: false,
        main: () => <HomePage/>
    },
    {
        path: '/sign-up',
        exact: false,
        main: () => <SignUpPage/>
    },
    {
        path: '/place/:id',
        exact: false,
        main: (object) => <PlaceDetailPage object={object} />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundpage />
    }
]

export default ROUTERS;