import useSignOut from "react-auth-kit/hooks/useSignOut";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import { useState } from "react";

// Todo: nema potrebe da ovo stoji u auth folderu, kada bi app imao npr dva dela portala jedan deo za usere koji nisu prijavljeni a drugi za registrovane,
// onda bi imalo vise smisla deliti kompoennte u Public i Auth/Restricted ili kako god ga nazvali


// Todo: layout ne bi trebala da bude stranica, layout je component koji se koristi za prikaz stranice te bi shodno tome bilo u components folderu
const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const location = window.location.pathname;
  // Q: Da li ce ovo raditi ako se resizuje prozor?
  const width = window.innerWidth;

  return (
    <div>
      {width <= 486 && (
        <div onClick={() => setShow(!show)} className={styles.burger}>
          Burger
        </div>
      )}
      <nav className={styles.navbar}>
        {width <= 486 && show && (
          <div className={styles["button-wrapper"]}>
            <div className={styles.logo}>LOGO</div>
            {location === "/favorites" && (
              <Button onClick={() => navigate("/")}>List</Button>
            )}
            {location === "/" && (
              <Button onClick={() => navigate("/favorites")}>Favorites</Button>
            )}
            <Button
            // Todo: posto ovaj onclick poziva dve funkcije, preglednije je da se to sve izvuce u handleLogout funckiju
            // html deo treba da ima sto manje logike napisane direktno u sebi
              onClick={() => {
                signOut();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        )}
        {width > 486 && (
          <div className={styles["button-wrapper"]}>
            <Button
              onClick={() => {
                signOut();
                navigate("/login");
              }}
            >
              Logout
            </Button>
            {/* Todo: istrazi kako da odradis breadcrumbs uz pomoc ANTD */}
            {location === "/favorites" && (
              <Button onClick={() => navigate("/")}>List</Button>
            )}
            {location === "/" && (
              <Button onClick={() => navigate("/favorites")}>Favorites</Button>
            )}
            <div className={styles.logo}>LOGO</div>
          </div>
        )}
      </nav>
      {children}
    </div>
  );
};

export default Layout;
