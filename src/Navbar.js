import React, { useEffect, useState, useContext } from "react";
import {userContext} from './App'
import { Link } from "react-router-dom";
import CategorieSelect from "./posts/CategorieSelect";
import "./App.css"

export default function Navbar() {

  const {userState, setUserState} = useContext(userContext)
  const [name, setName] = useState("");

  useEffect(()=>{
    const nameSession = sessionStorage.getItem("Name");
    if(nameSession === null){
      setUserState(false)
    }else{
      setUserState(true)
      setName(JSON.parse(nameSession));
    }

  },[userState])

  const logOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("Tokens");
    setUserState(false);
  };



  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000">
            Pelados
          </a>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              {userState ? (
                <Link to="/new-post">
                  <button className="btn btn-success ml-auto" type="submit">
                    + Crear Post
                  </button>
                </Link>
              ) : null}
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              {!userState ? (
                <Link to="/login">
                  <button className="btn btn-success ml-auto" type="submit">
                    Iniciar Sesion
                  </button>
                </Link>
              ) : (
                <button
                  className="btn btn-success ml-auto"
                  type="submit"
                  onClick={logOut}
                >
                  Cerrar Sesion
                </button>
              )}
              {!userState ? (
                <Link to="/sign-in">
                  <button
                    className="btn btn-sm btn-primary ml-auto"
                    type="submit"
                  >
                    Registrate
                  </button>
                </Link>
              ) : (
                <button className="btn btn-sm btn-outline-light" type="submit">
                  {name}
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
