import useSignOut from "react-auth-kit/hooks/useSignOut";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import { useState } from "react";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const location = window.location.pathname;
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
