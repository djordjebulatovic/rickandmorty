// Todo: u komponentama ( i drugim js fajlovima ) importe gledamo da odvojimo radi preglednosti,
// prvo idu importi iz node_modulsa ( react, react-router-dom etc )
// zatim red razmaka, pa relative imports, i onda red razmaka pa css

import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.scss";
import { LoginForm } from "./components/LoginForm/LoginForm";

function Login() {
  // Todo: Pogledaj u ANTD Form komponentu pa uradi login stranicu uz pomoc nje, to je neki standard za vecinu formi posto resava gomilu stvari
  // kao sto su validacija, stilovi, bindovanje statea i slicno, probaj primeni funkcionalnosti kao sto su required fields, regex validations

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
