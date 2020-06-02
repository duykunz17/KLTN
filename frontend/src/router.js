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
import PurchasedPage from './views/PurchasedPage';
import SchedulePage from './views/SchedulePage';
import PersonalPage from './views/PersonalPage';
import NewFeedPage from './views/NewFeedPage';
import PostDetailPage from './views/PostDetailPage';
import DestinationDetailPage from './views/DestinationDetailPage';
import ListSchedulePage from './views/ListSchedulePage';
import ProductDetailPage from './views/ProductDetailPage';
import ScheduleDetailPage from './views/ScheduleDetailPage';
import CheckoutPage from './views/CheckoutPage';

// views admin
import AdminPage from './views/AdminPage';
import AdminManagerPostPage from './views/AdminManagerPostPage';
import AdminStatisticalProductBestSellerPage from './views/AdminStatisticalProductBestSellerPage';
import AdminStatisticalRevenueSalePage from './views/AdminStatisticalRevenueSalePage';


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
        path: '/product-detail/:id',
        exact: false,
        main: (object) => <ProductDetailPage object={object} />
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
        path: '/schedule',
        exact: false,
        main: ({history}) => <SchedulePage history={history}/>
    },
    {
        path: '/schedule-detail/:id',
        exact: false,
        main: (object) => <ScheduleDetailPage object={object} />
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
        path: '/post-detail/:id',
        exact: false,
        main: ({match}) => <PostDetailPage match={match} />
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
        path: '/checkout',
        exact: false,
        main: () => <CheckoutPage/>
    },
    {
        path: '/admin/product-management',
        exact: false,
        main: ({history}) => <AdminPage history={history} />
    },
    {
        path: '/admin/post-management',
        exact: false,
        main: ({history}) => <AdminManagerPostPage history={history} />
    },
    {
        path: '/admin/statistical-product-best-seller',
        exact: false,
        main: ({history}) => <AdminStatisticalProductBestSellerPage history={history} />
    },
    {
        path: '/admin/statistical-renvenue-sale',
        exact: false,
        main: ({history}) => <AdminStatisticalRevenueSalePage history={history} />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundpage />
    }
]

export default ROUTERS;