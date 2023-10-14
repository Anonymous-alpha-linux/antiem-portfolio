import Footer from '../../layout/footer';
import Navbar from '../../layout/nav';
import Home from '../../page/home';

export const publicRoutes = [
    {
        name: 'Home Page',
        path: '',
        element: (
            <>
                <Navbar />
                <Home />
                <Footer />
            </>
        ),
    },
];
