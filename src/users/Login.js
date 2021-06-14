import axios from "axios";
import React, { useState } from "react";
import {useHistory} from "react-router-dom";
//import { isElementOfType } from "react-dom/test-utils";

export default function Login() {

  const history = useHistory();
  const [isLoged, setIsLoged] = useState(false)
  const [userLog, setUserLog] = useState({
    user_email: "",
    user_pw: "",
  });

  const login = (user) => {
    return axios.post("http://localhost:8080/login", {
      user_email: user.user_email,
      user_pw: user.user_pw,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      user_email: userLog.user_email,
      user_pw: userLog.user_pw,
    };
    const result = await login(user);
    //console.log(result);
    if (result.status !== 200) {
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
      console.log(result.data)
      //alert("Bienvenido " + result.data.name);
      sessionStorage.setItem("Tokens", JSON.stringify(result.data.tokens))
      sessionStorage.setItem("Name", JSON.stringify(result.data.name))
      setUserLog({
        user_email: "",
        user_pw: "",
      });
      setIsLoged(!isLoged)
    }
    const sessionTokens = sessionStorage.getItem("Tokens")
    console.log(JSON.parse(sessionTokens))
    history.push("/")
  };

  return (
    <div className="container jumbotron w-25 shadow p-3 mb-5 bg-white rounded border border-primary">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            name="userEmail"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={userLog.user_email}
            onChange={(e) =>
              setUserLog({ ...userLog, user_email: e.target.value })
            }
          ></input>
        </div>
        
        <div className="form-group">
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            placeholder="Password"
            name="userPassword"
            value={userLog.user_pw}
            onChange={(e) =>
              setUserLog({ ...userLog, user_pw: e.target.value })
            }
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
