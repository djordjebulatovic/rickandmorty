import { Navigate, Route, Routes } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import Login from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { RouteKeysEnum } from "./routes.constants";
import Favorites from "../pages/Favorites/Favorites";
import Layout from "../components/Layout/Layout";

export const RoutesList = () => {
  const isAuth = useIsAuthenticated();

  const fallbackRedirect = isAuth ? "/" : RouteKeysEnum.LOGIN;

  console.log(isAuth);

  return (
    <Routes>
      <Route path={RouteKeysEnum.LOGIN} element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path={RouteKeysEnum.FAVORITES} element={<Favorites />} />
        <Route path="*" element={<Navigate to={fallbackRedirect} />} />
      </Route>
    </Routes>
  );
};
