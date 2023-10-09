import { Outlet, createBrowserRouter } from 'react-router-dom';
import { adminRoutes } from './admin';
import { publicRoutes } from './public';

export const routers = createBrowserRouter([
    {
        path: 'admin',
        element: <Outlet></Outlet>,
        children: adminRoutes,
    },
    {
        path: '',
        element: <Outlet></Outlet>,
        children: publicRoutes,
    },
]);
