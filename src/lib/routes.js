// root
// login
// register
// protected
// dashboard
// users
// profile  id

import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "./../components/layout/index";
import Dashboard from "../components/dashboard";
import Users from "./../components/users/index";
import Profile from "../components/profile";
import Comments from "../components/comments";
import Home from "../components/home";

// comments id
export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";

export const router = createBrowserRouter([
  { path: ROOT, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      { path: DASHBOARD, element: <Dashboard /> },
      { path: USERS, element: <Users /> },
      { path: PROFILE, element: <Profile /> },
      { path: COMMENTS, element: <Comments /> },
    ],
  },
]);
