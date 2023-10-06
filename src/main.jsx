import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebaseConfig from './authentication/firebaseConfig.jsx'
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Registration from './pages/Registration/Registration.jsx'
import Login from './pages/Login/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
