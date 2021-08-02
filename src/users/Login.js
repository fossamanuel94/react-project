import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../App";
import '../App.css'

export default function Login() {

  const { setUserState } = useContext(userContext);
  const history = useHistory();
  const [userLog, setUserLog] = useState({
    user_email: "",
    user_pw: "",
  });
  const [inputEmailStyle, setInputEmailStyle] = useState("input-form");
  const [inputPwStyle, setInputPwStyle] = useState("input-form");
  const [phEmail, setPhEmail] = useState("Email");
  const [phPass, setPhPass] = useState("Password");
  const [alertState, setAlertState] = useState(true);

  const login = (user) => {
    return axios.post("http://localhost:8080/users/login", {
      user_email: user.user_email,
      user_pw: user.user_pw,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLog.user_email === "") {
      setInputEmailStyle("input-form invalid");
      setPhEmail("Complete el campo");
    }
    if (userLog.user_pw === "") {
      setInputPwStyle("input-form invalid");
      setPhPass("Complete el campo");
    } else {
      const user = {
        user_email: userLog.user_email,
        user_pw: userLog.user_pw,
      };
      const result = await login(user);
      //console.log(result);
      if (result.status !== 200) {
        setAlertState(false);
        if (result.data.message === "Email inexistente") {
          console.log(result.data.message);
          setUserLog({
            user_email: "",
            user_pw: "",
          });
        } else {
          console.log(result.data.message);
          setUserLog({ ...userLog, user_pw: "" });
        }
      } else {
        console.log(result.data);
        //alert("Bienvenido " + result.data.name);
        sessionStorage.setItem("Tokens", JSON.stringify(result.data.tokens));
        sessionStorage.setItem("Name", JSON.stringify(result.data.name));
        setUserLog({
          user_email: "",
          user_pw: "",
        });
        setUserState(true);
        const sessionTokens = sessionStorage.getItem("Tokens");
        console.log(JSON.parse(sessionTokens));
        history.push("/");
      }
    }
  };

  return (
    <form className="container-login" onSubmit={handleSubmit}>
      <p className="title-form">Login</p>
      {!alertState ? (
          <div
            className="alert-form"
          >Email o Contrasena incorrecto
          </div>
        ) : null}
      <input 
        type="email" 
        className={inputEmailStyle}
        placeholder={phEmail}
        value={userLog.user_email}
        onChange={(e) =>
          setUserLog({ ...userLog, user_email: e.target.value })
        }
        onFocus={() => setInputEmailStyle(("input-form"), setAlertState(true))}
      />
      <input 
        type="password" 
        className={inputPwStyle} 
        placeholder={phPass}
        value={userLog.user_pw}
        onChange={(e) =>
        setUserLog({ ...userLog, user_pw: e.target.value })
        }
        onFocus={() => setInputPwStyle(("input-form"),setAlertState(true))}
      />
      <button type="submit" className="btn-form">Login</button>
      <a href="/sign-in">No estas registrado? Click aca!</a>
    </form>
  );

}
