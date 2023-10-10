import { Outlet } from 'react-router-dom';
import Sidebar from '../../layout/sidebar/sidebar';

let sidebarMenu = [
    {
        name: 'Home',
        link: '/admin',
    },
    {
        name: 'Web Content',
        link: '/admin/web-content-editor',
    },
];

export const adminRoutes = [
    {
        path: '',
        element: (
            <Sidebar menu={sidebarMenu}>
                <Outlet></Outlet>
            </Sidebar>
        ),
        children: [
            {
                path: '',
                element: <h2>Trang chủ Adminstrator</h2>,
            },
            {
                path: 'web-content-editor',
                element: <h2>Table of content</h2>,
            },
            {
                path: 'page',
                element: <h2>Page</h2>,
            },
        ],
    },
];
