import useSignOut from "react-auth-kit/hooks/useSignOut";
import Button from "../Button/Button";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import { useState } from "react";

// Todo: nema potrebe da ovo stoji u auth folderu, kada bi app imao npr dva dela portala jedan deo za usere koji nisu prijavljeni a drugi za registrovane,
// onda bi imalo vise smisla deliti kompoennte u Public i Auth/Restricted ili kako god ga nazvali
const Layout = () => {
  const [show, setShow] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate("/login");
  }

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
              <Button testId="8" onClick={() => navigate("/")}>
                List
              </Button>
            )}
            {location === "/" && (
              <Button testId="7" onClick={() => navigate("/favorites")}>
                Favorites
              </Button>
            )}
            <Button testId="9" onClick={() => handleLogout()}>
              Logout
            </Button>
          </div>
        )}
        {width > 486 && (
          <div className={styles["button-wrapper"]}>
            <Button
              testId="4"
              onClick={() => {
                signOut();
                navigate("/login");
              }}
            >
              Logout
            </Button>
            {location === "/favorites" && (
              <Button testId="5" onClick={() => navigate("/")}>
                List
              </Button>
            )}
            {location === "/" && (
              <Button testId="6" onClick={() => navigate("/favorites")}>
                Favorites
              </Button>
            )}
            <Button
              testId="locations-btn"
              onClick={() => navigate("/locations")}
            >
              Locations
            </Button>
            <div className={styles.logo}>LOGO</div>
          </div>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
