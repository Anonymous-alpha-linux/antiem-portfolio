const { createBrowserRouter, Outlet } = require('react-router-dom');
const { publicRoutes } = require('./public');
const { adminRoutes } = require('./admin');

const routers = createBrowserRouter([
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

export { routers };
