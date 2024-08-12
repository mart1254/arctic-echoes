import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "./index.css"
import Home from './routes/Home';
import LogDetails from './routes/LogDetails';
import NewLog from './routes/NewLog';
import EditLog from './routes/EditLog';




// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: "/log/:id", element: <LogDetails /> },
      { path: "/new", element: <NewLog /> },
      { path: "/edit/:id", element: <EditLog /> }
    ]
  }
]);

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
