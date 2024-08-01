import { lazy } from 'react';

const Login = lazy(() => import('../../views/auth/Login'));
const VerifyNewuser = lazy(() => import('../../views/auth/VerifyNewuser'));
const Register = lazy(() => import('../../views/auth/Register'));
const ForgotPassword = lazy(() => import('../../views/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../../views/auth/ResetPassword'));

const Home = lazy(() => import('../../views/auth/Home'));
const UnAuthorized = lazy(() => import('../../views/UnAuthorized'));
const Success = lazy(() => import('../../views/Success'));

const publicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/forgotPassword',
        element: <ForgotPassword />,
    },
    {
        path: '/resetPassword/:token',
        element: <ResetPassword />,
    },
    {
        path: '/verifynewuser/:token',
        element: <VerifyNewuser />,
    },
    {
        path: '/unauthorized',
        element: <UnAuthorized />
    },
    {
        path: '/success',
        element: <Success />
    }
];

export default publicRoutes;
