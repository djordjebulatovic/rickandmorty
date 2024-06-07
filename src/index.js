import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import List from './components/List/List'
import Character from './components/Character/Character'
import Login from './pages/Login/Login'
import Home from './pages/auth/Home/Home'
import Favorites from './pages/auth/Favorites/Favorites'

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';



const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/favorites",
    element: <Favorites/>,
  },
  {
    path: "/",
    element: <Home/>,
  },
]);

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

