import styles from "./Login.module.scss";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import  useSignIn  from 'react-auth-kit/hooks/useSignIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
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
      <ToastContainer />
    </div>
  );
}

export default Login;
