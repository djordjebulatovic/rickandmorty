import Login from "./pages/Login/Login";
import Home from "./pages/auth/Home/Home";
import Favorites from "./pages/auth/Favorites/Favorites";
import { ToastContainer } from "react-toastify";

import { Route, Routes } from "react-router-dom";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import Layout from "./components/Layout/Layout";

function App() {
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });
  return (
    <AuthProvider store={store}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
