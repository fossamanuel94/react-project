import axios from "axios";
import React, { useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import ComentsList from "../comments/ComentsList";
import AddComent from "../comments/AddComent";
import moment from "moment";
import htmlParser from 'html-react-parser'
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
    return axios.get(`http://localhost:8080/posts/post/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const result = ReturnPost(id);
    result.then((res) => {
      setPost(res.data.result);
    });
  }, []);

  return (
    <div className="container-post">
      <Link to={`/categorie-post/${id_categorie}`}>
        <p className="categorie-post">{categorie}</p>
      </Link>
      <h1 className="title-post">
        {post_title}
      </h1>
      <div className="data-post-container">
        <p className="data-post">{user_nickname}</p>
        <p className="data-post">{moment(post_date).format("l")}</p>
      </div>
      <h3 className="subtitle-post">{post_subtitle}</h3>
      <img
        src={post_image}
        alt="..."
        className="img-post"
      />
      <div className="content-post">{htmlParser(`${post_desc}`)}</div>
      <hr></hr>
        <h2 className="comments-title">Comentarios</h2>
        <div className="comment-list">
          <AddComent id={id}></AddComent> 
          <ComentsList id={id}></ComentsList>       
        </div>
    </div>
  );
}

