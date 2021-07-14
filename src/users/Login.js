import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../App";
import '../App.css'
//import { isElementOfType } from "react-dom/test-utils";

export default function Login() {
  const { setUserState } = useContext(userContext);
  const history = useHistory();
  const [userLog, setUserLog] = useState({
    user_email: "",
    user_pw: "",
  });
  const [inputEmailStyle, setInputEmailStyle] = useState("form-control");
  const [inputPwStyle, setInputPwStyle] = useState("form-control");
  const [phEmail, setPhEmail] = useState("");
  const [phPass, setPhPass] = useState("");
  const [alertState, setAlertState] = useState(true);

  const login = (user) => {
    return axios.post("http://localhost:8080/login", {
      user_email: user.user_email,
      user_pw: user.user_pw,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLog.user_email === "") {
      setInputEmailStyle("form-control is-invalid");
      setPhEmail("Complete el campo");
    }
    if (userLog.user_pw === "") {
      setInputPwStyle("form-control is-invalid");
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
    <div className="container jumbotron w-25 shadow p-3 mb-5 bg-white rounded border border-primary">
      <form onSubmit={handleSubmit}>
        {!alertState ? (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >Email o Contrasena incorrecto
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            className={inputEmailStyle}
            id="userEmail"
            name="userEmail"
            aria-describedby="emailHelp"
            placeholder={phEmail}
            value={userLog.user_email}
            onChange={(e) =>
              setUserLog({ ...userLog, user_email: e.target.value })
            }
            onFocus={() => setInputEmailStyle(("form-control"), setAlertState(true))}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            className={inputPwStyle}
            id="userPassword"
            placeholder={phPass}
            name="userPassword"
            value={userLog.user_pw}
            onChange={(e) =>
              setUserLog({ ...userLog, user_pw: e.target.value })
            }
            onFocus={() => setInputPwStyle(("form-control"),setAlertState(true))}
          ></input>
          <br></br>
          <button type="submit" className="btn btn-outline-primary btn-block">
            Logear
          </button>
        </div>
      </form>
    </div>
  );
}
