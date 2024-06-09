// Todo: u komponentama ( i drugim js fajlovima ) importe gledamo da odvojimo radi preglednosti,
// prvo idu importi iz node_modulsa ( react, react-router-dom etc )
// zatim red razmaka, pa relative imports, i onda red razmaka pa css

import styles from "./Login.module.scss";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import  useSignIn  from 'react-auth-kit/hooks/useSignIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  // Todo: Pogledaj u ANTD Form komponentu pa uradi login stranicu uz pomoc nje, to je neki standard za vecinu formi posto resava gomilu stvari
  // kao sto su validacija, stilovi, bindovanje statea i slicno, probaj primeni funkcionalnosti kao sto su required fields, regex validations
  const [user, setUser] = useState({name: '', password: ''});
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(user.name === "admin" && user.password === "admin"){
      signIn({
        auth: {
          token: "dsad...",
          type: "Bearer"
        },
        // refresh: "dsad...",
        userState: {
          name: user.name,
          uid: "user.id"
        }
      })
      navigate('/');
    }else {
      toast.error("Error", {
        position: "top-center"
      });
    }
    
} 

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <div>
            {/* Todo: koristi Ant Input i button komponente, obrati paznju kako se koriste uz formu da bi sve to radilo */}
            <input
              className={styles.input}
              placeholder="Username"
              type="text"
              onChange={(e)=>setUser({...user, name: e.target.value})}
            ></input>
          </div>

          <div>
            <input
              className={styles.input}
              placeholder="Password"
              type="password"
              onChange={(e)=>setUser({...user, password: e.target.value})}
            ></input>
          </div>
          <div>
            <button className={styles.button} type="submit">
              LOG IN
            </button>
          </div>
        </form>
      </div>
      {/* Todo: ovo je neka globalna komponenta, trebalo bi da stoji na u app.ts npr, kako ne bi morao da je pozivas na svakoj stranici na kojoj je toast container potreban   */}
      <ToastContainer />
    </div>
  );
}

export default Login;
