import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ComentsList from "../comments/ComentsList";
import AddComent from "../comments/AddComent";
import Card from "../Card";
import moment from "moment";
import "../App.css";

export default function SelectedPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const {
    post_title,
    post_subtitle,
    post_desc,
    post_image,
    post_date,
    user_nickname,
    categorie,
    id_categorie
  } = post;

  const ReturnPost = (id) => {
    return axios.get(`http://localhost:8080/post/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const result = ReturnPost(id);
    result.then((res) => {
      setPost(res.data.result);
    });
  }, []);

  return (
    <div class="container-post">
      <Link to={`/categorie-post/${id_categorie}`}>
        <p class="categorie-post">{categorie}</p>
      </Link>
      <h1 class="title-post">
        {post_title}
      </h1>
      <div class="data-post-container">
        <p class="data-post">{user_nickname}</p>
        <p class="data-post">{moment(post_date).format("l")}</p>
      </div>
      <h3 class="subtitle-post">{post_subtitle}</h3>
      <img
        src={post_image}
        class="img-post"
      />
      <p class="content-post">{post_desc}</p>
      <hr></hr>
        <h2 class="comments-title">Comentarios</h2>
        <div class="comment-list">
          <AddComent id={id}></AddComent> 
          <ComentsList id={id}></ComentsList>       
        </div>
    </div>
  );
}

/* 
<div className="row">
<div className="col col-8">
  <div className="row">
    <div className="container  bg-light rounded border">
      <h1><u>{post_title}</u></h1><br></br>
      <h4>{post_subtitle}</h4>
      <hr></hr>
      <img src={post_image} alt="..." className="img-fluid"></img>
      <hr></hr>
      <div className="row justify-content-center border-right">
        <p className="col col-3">{moment(post_date).format("l")}</p>
        <p className="col col-3">{user_nickname}</p>
        <p className="col col-3">{categorie}</p>
      </div>
      
      <p>{post_desc}</p>
    </div>
  </div>
  <div className="row mt-2">
    <div className="container bg-light rounder border">
      <h5>COMENTARIOS</h5>
    </div>
  </div>
  <div className="row">
      <div className="container  bg-light rounded border">
          <ComentsList id={id}></ComentsList>
          <AddComent id={id}></AddComent>
      </div>
  </div>
</div>
</div> */
