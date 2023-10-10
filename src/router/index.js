const { createBrowserRouter } = require('react-router-dom');
const { publicRoutes } = require('./public');
const { adminRoutes } = require('./admin');

const routers = createBrowserRouter([...publicRoutes, ...adminRoutes]);

export { routers };
