import React from "react";
import { Link } from "react-router-dom";

export default function Post(props) {
    
  return (
      <div className="card mt-5 ml-5 bg-dark" style={{width: '18rem'}}>
        <img src={props.post.post_image} alt="..." className="card-img-top" height="180" width="286"></img>
        <div className="card-body">
          <p className="card-text" style={{color:'green'}}>{props.post.categorie}</p>
          <Link to={`/post/${props.post.id_post}`} style={{color: 'white'}}>
            <h5 className="card-title">{props.post.post_title}</h5>
          </Link>
          <p className="card-text" style={{color:'grey'}}>Este texto es de prueba para ver como queda dentro de la card</p>
          <Link to={`/post/${props.post.id_post}`} style={{color: 'white'}}>
            <button className="btn btn-outline-success align-center">Ver Post</button>
          </Link>
        </div>
      </div>
  );
}

