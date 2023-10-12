import Footer from '../../layout/footer';
import Navbar from '../../layout/nav';
import Home from '../../page/home';

export const publicRoutes = [
    {
        path: '',
        element: (
            <>
                <Navbar />
                <Home />
                <Footer />
            </>
        ),
    },
    {
        path: 'home',
        element: <h2>Trang chủ</h2>,
    },
    {
        path: 'table-of-content',
        element: <h2>Table of content</h2>,
    },
];
