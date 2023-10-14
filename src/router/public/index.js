import { Outlet } from 'react-router';
import Footer from '../../layout/footer';
import Navbar from '../../layout/nav';
import Home from '../../page/home';

export const list_pages = [
    {
        name: 'Home Page',
        display_name: 'Home Page',
        path: '',
        element: <Home />,
    },
];

export const publicRoutes = [
    {
        path: '',
        element: (
            <>
                <Navbar />
                <Outlet />
                <Footer />
            </>
        ),
        children: list_pages,
    },
];
