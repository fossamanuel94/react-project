import React, { useEffect, useState, useContext } from "react";
import {userContext} from '../App'
import { Link, useHistory } from "react-router-dom";
import "../App.css"
import listSB from "./NavBarList";

export default function Navbar() {

  const history = useHistory()
  const {userState, setUserState} = useContext(userContext)
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false)
  const [buttonState, setButtonState] = useState(false)

  useEffect(()=>{
    const nameSession = sessionStorage.getItem("Name");
    const typeSession = JSON.parse(sessionStorage.getItem("Type"))

    if(nameSession === null && typeSession === null){
      setUserState(false)
    }else{
      setUserState(true)
      setName(JSON.parse(nameSession));
      if(typeSession === 1) setIsAdmin(true)
    }

  },[userState])

  const logOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("Type")
    sessionStorage.removeItem("Tokens");
    setUserState(false);
    setIsAdmin(false);
    history.push("/")
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
                      {isAdmin ? (
                        <Link to={`/new-post`}>
                          <li className="nav-user">{name}</li>
                        </Link>
                      ): (
                        <li className="nav-user">{name}</li>
                      )
                      } 
                    </>
                  )
                }
            </ul>
        </div>
    </div>
  );
}
