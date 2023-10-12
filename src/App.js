import './App.css';
import { RouterProvider } from 'react-router-dom';

import { routers } from './router';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function App() {
    return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
