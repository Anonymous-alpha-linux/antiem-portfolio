const { createBrowserRouter } = require('react-router-dom');
const { publicRoutes } = require('./public');
const { adminRoutes } = require('./admin');
const { userRoutes } = require('./user');

const router = createBrowserRouter([...publicRoutes, ...adminRoutes, ...userRoutes]);

export { router };
