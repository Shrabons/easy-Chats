import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './firebaseConfig';
import './index.css';
import Forgotpassword from './pages/forgotpassword';
import Home from './pages/home';
import Login from './pages/login/login';
import Messages from './pages/Messages/Messages';
import Notification from './pages/notifications/Notification';
import Registration from './pages/registration';
import Settings from './pages/settings/Settings';
import reportWebVitals from './reportWebVitals';
import store from './store';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <Forgotpassword />,
  },
  {
    path: "/message",
    element: <Messages />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
