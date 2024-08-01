import { lazy } from "react";
const UserDashboard = lazy(() => import('../../views/user/UserDashboard'))
const UserToCustomer = lazy(() => import('../../views/user/UserToCustomer'))
const Profile = lazy(() => import('../../views/user/Profile'))
const Allmembers = lazy(() => import('../../views/user/Allmembers'))
const Pending = lazy(() => import('./../../views/Pending'))
const Deactive = lazy(() => import('./../../views/Deactive'))

export const privateRoutes = [
    
    {
        path: '/user/account-pending',
        element: <Pending />,
        ability: 'user'
    },
    {
        path: '/user/account-deactive',
        element: <Deactive />,
        ability: 'user'
    },
    {
        path: '/user/dashboard',
        element: <UserDashboard />,
        role: 'user',
        ability: 'user',
        status: 'active'
    },
    {
        path: '/user/dashboard/chat-friends/:friendId',
        element: <UserToCustomer />,
        role: 'user',
        ability: 'user',
        status: 'active'
    },
    {
        path: '/user/dashboard/chat-friends',
        element: <UserToCustomer />,
        role: 'user',
        ability: 'user',
        status: 'active'
    },
    {
        path: '/user/dashboard/profile',
        element: <Profile />,
        role: 'user',
        ability: 'user',
        status: 'active'
    },
    {
        path: '/user/dashboard/allmembers',
        element: <Allmembers />,
        role: 'user',
        ability: 'user',
        status: 'active'
    },

]