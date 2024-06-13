import { ToastContainer } from "react-toastify";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";

import { RoutesList } from "./router/RoutesList";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

function App() {
  // window.localStorage.setItem("favorites", JSON.stringify([]));

  return (
    <AuthProvider store={store}>
      <RoutesList />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
