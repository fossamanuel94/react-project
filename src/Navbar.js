import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategorieSelect from "./posts/CategorieSelect";

export default function Navbar() {
  const [name, setName] = useState("");
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    const nameSession = sessionStorage.getItem("Name");
    if (nameSession === null) {
      setIsLoged(false);
      console.log("Inicie Sesion");
    } else {
      setIsLoged(true);
      console.log("Sesion Iniciada");
      setName(JSON.parse(nameSession));
    }
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("Tokens");
    setIsLoged(false);
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
              {isLoged ? (
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
              {!isLoged ? (
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
              {!isLoged ? (
                <Link to="/sign-in">
                  <button
                    className="btn btn-sm btn-primary ml-auto"
                    type="submit"
                  >
                    Registrate
                  </button>
                </Link>
              ) : (
                <button className="btn btn-sm btn-outline-dark" type="submit">
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
