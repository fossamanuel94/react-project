import React, { useEffect, useState, useContext } from "react";
import {userContext} from './App'
import { Link } from "react-router-dom";
import "./App.css"
import listSB from "./sidebar/SideBarList";

export default function Navbar() {

  const {userState, setUserState} = useContext(userContext)
  const [name, setName] = useState("");
  const [buttonState, setButtonState] = useState(false)

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
    <div className="m-navbar">
        <div className="container-nav">
            <div className="container-title">
              <button 
                className="nav-button" 
                onClick={()=>{setButtonState(!buttonState)}}/>
              <Link className="nav-title" to="/">PELADOS</Link>
            </div>
            <ul className="nav-ul" id={!buttonState ? "" : "hidden"}>  
                {listSB.map(categorie=>{
                  const {id_categorie, categorie_name} = categorie;
                  return(
                    <Link 
                      className="nav-categorie" 
                      to={`/categorie-post/${id_categorie}`} 
                      key={id_categorie} 
                      onClick={()=>{setButtonState(false)}}>
                        <li className="nav-li">{categorie_name}</li>
                    </Link>
                  )
                })}
                {
                  !userState ? (
                    <><Link 
                      className="nav-categorie" 
                      to="/login" 
                      onClick={()=>{setButtonState(false)}}>
                        <li className="nav-user">Login</li>
                    </Link>
                    <Link 
                      className="nav-categorie" 
                      to="/sign-in" 
                      onClick={()=>{setButtonState(false)}}>
                        <li className="nav-user">Registrate</li>
                    </Link></>
                  ) : (
                    <>
                      <li className="nav-user" onClick={logOut}>Logout</li>
                      <li className="nav-user">{name}</li>
                    </>
                  )
                }
            </ul>
        </div>
    </div>
  );
}

/*    

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

    */