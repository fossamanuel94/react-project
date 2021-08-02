import React from "react";
import { Link } from "react-router-dom";

export default function Post(props) {

  const {post_image, id_post, post_title, post_subtitle} = props.post;
    
  return (
    <div className="col-card">
      <Link className="link" to={`/post/${id_post}`}>
        <img className="img-card" alt="..." src={post_image}/>
      </Link>
      <Link className="link" to={`/post/${id_post}`}>  
        <h3 className="title-card">{post_title}</h3>
      </Link>
      <p className="subtitle-card">{`${post_subtitle.substring(0, 70)}...`}</p>
    </div>
  );
}
