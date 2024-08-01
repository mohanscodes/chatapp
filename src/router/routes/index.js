import { privateRoutes } from './privateRoutes';
import MainLayout from './../../layout/mainLayout';

import ProtectRoute from './ProtectRoute'; // admin & seller

export const getRoutes = () => {

    
    privateRoutes.map( r => {
        r.element = <ProtectRoute route={r} >{r.element}</ProtectRoute>
     })
    // compare and get routes user role based

    return {
        path: '/',
        element: <MainLayout />,
        children: privateRoutes
    }
}