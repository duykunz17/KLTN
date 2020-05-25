import React from 'react';

// import Views
import LoginPage from "./views/LoginPage";
import HomePage from './views/HomePage';
import SignUpPage from './views/SignUpPage';
import PlaceDetailPage from './views/PlaceDetailPage';
import NotFoundpage from "./views/NotFoundpage";
import ProductPage from './views/ProductPage';
import PlacePage from './views/PlacePage';
import AboutPage from './views/AboutPage';
import AdminPage from './views/AdminPage';
import PurchasedPage from './views/PurchasedPage';
import SchedulePage from './views/SchedulePage';
import PersonalPage from './views/PersonalPage';
import NewFeedPage from './views/NewFeedPage';
import PostDetailPage from './views/PostDetailPage';
import DestinationDetailPage from './views/DestinationDetailPage';
import ListSchedulePage from './views/ListSchedulePage';
import StatisticalProductBestSellerPage from './views/StatisticalProductBestSellerPage';


const ROUTERS = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage/>
    },
    {
        path: '/login',
        exact: false,
        main: ({history}) => <LoginPage history={history} />
    },
    {
        path: '/sign-up',
        exact: false,
        main: () => <SignUpPage/>
    },
    {
        path: '/product',
        exact: false,
        main: () => <ProductPage />
    },
    {
        path: '/place',
        exact: true,
        main: () => <PlacePage/>
    },
    {
        path: '/place/:id',
        exact: true,
        main: (object) => <PlaceDetailPage object={object} />
    },
    {
        path: '/place/destination/:id',
        exact : false,
        main: (object) => <DestinationDetailPage object={object} />
    },
    {
        path: '/about',
        exact: false,
        main: () => <AboutPage/>
    },
    {
        path: '/admin/product-management',
        exact: false,
        main: () => <AdminPage/>
    },
    {
        path: '/admin/statistical-product-best-seller',
        exact: false,
        main: () => <StatisticalProductBestSellerPage/>
    },
    {
        path: '/schedule',
        exact: false,
        main: ({history}) => <SchedulePage history={history}/>
    },
    {
        path: '/list-schedule',
        exact: false,
        main: ({history}) => <ListSchedulePage history={history}/>
    },
    {
        path: '/post',
        exact: false,
        main: ({history}) => <PersonalPage history={history}/>
    },
    {
        path: '/post-detail',
        exact: false,
        main: () => <PostDetailPage/>
    },
    {
        path: '/newfeed',
        exact: false,
        main: () => <NewFeedPage/>
    },
    {
        path: '/payment-history',
        exact: false,
        main: ({history}) => <PurchasedPage history={history} />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundpage />
    }
]

export default ROUTERS;