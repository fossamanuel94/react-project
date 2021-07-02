import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComentsList from "../comments/ComentsList";
import AddComent from "../comments/AddComent";
import Card from "../Card";
import moment from "moment";
import "../App.css"

export default function SelectedPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const {id_post,post_title,post_subtitle,post_desc,post_image,post_date,user_nickname,categorie} =post;

  const ReturnPost = (id) => {
    return axios.get(`http://localhost:8080/post/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0,0)
    const result = ReturnPost(id);
    result.then((res) => {
      setPost(res.data.result);
    });
  }, []);

  return (
    <div className="row">
      <div className="col col-8">
        <div className="row">
          <div className="container  bg-light rounded border">
            <h1><u>{post_title}</u></h1><br></br>
            <h4>{post_subtitle}</h4>
            <hr></hr>
            <img src={post_image} className="img-fluid"></img>
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
      <div className="col col-sm-auto ml-2 container bg-light rounded border">
        <h2 className="ml-4 mt-3">Post Relacionados</h2>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
}
