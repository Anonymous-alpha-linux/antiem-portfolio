import './App.css';
import { RouterProvider } from 'react-router-dom';

import { routers } from './router';

// css
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
