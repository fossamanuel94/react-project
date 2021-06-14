import axios from "axios";
import React, { useState, useEffect } from "react";
import CategorieSelect from "./CategorieSelect"

export default function Posts() {
  const [post, setPost] = useState({
    postTitle: "",
    postImage: "",
    postDesc: "",
    postCateg:""
  });

  const categorieSelect = (categorie) =>{
    setPost({...post, postCateg:categorie})
  }

  const createPost = (data) => {
    
      return axios.post(
        "http://localhost:8080/add-post",
        {
          post_title: data.postSended.post_title,
          post_image: data.postSended.post_image,
          post_desc: data.postSended.post_desc,
        },
        {
          headers: { Authorization: "Bearer " + data.token },
        }
      );
    
    //console.log(data.token)
  };

  const TokenFunction = (tokenR) => {
    return axios.post("http://localhost:8080/token", { token: tokenR });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokens = sessionStorage.getItem("Tokens");
    const parsedTokens = JSON.parse(tokens);
    //console.log(parsedTokens.tokenR);
    const data = {
      postSended: {
        post_title: post.postTitle,
        post_image: post.postImage,
        post_desc: post.postDesc,
      },
      token: parsedTokens.tokenA,
    }
  

    if (sessionStorage.getItem("Tokens") === null) {
      console.log("Inicie Sesion");
    } else {
      const result = await createPost(data);
      console.log(result);
      if (result.data.message === "jwt expired") {
        const newToken = await TokenFunction(parsedTokens.tokenR);
        console.log(newToken.data.tokenA);
        data.token = newToken.data.tokenA;
        const newResult = await createPost(data);
        console.log(newResult);
      } else {
        console.log("Token Activo");
      }
    }
    /*console.log(post);
    setPost({
      postTitle:"",
      postDesc:""
    })*/
  };

  useEffect(()=>{
    if(post.postCateg===undefined){
      setPost({...post, postCateg:1})
    }
    console.log(post)
  },[])

  return (
    <div className="container jumbotron w-75 shadow p-3 mb-5 bg-white rounded border border-dark">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="postTitle">Titulo</label>
          <input
            type="text"
            className="form-control"
            id="postTitle"
            name="postTitle"
            placeholder="Titulo"
            value={post.postTitle}
            onChange={(e) => setPost({ ...post, postTitle: e.target.value })}
          ></input>
        </div>
        <div className="form-group">
          <label>Categoria</label><br></br>
            <CategorieSelect selectCateg={categorieSelect}></CategorieSelect>
        </div>
        <div className="form-group">
          <label htmlFor="postImage">Imagen</label>
          <input
            type="text"
            className="form-control"
            id="postImage"
            name="postImage"
            placeholder="Imagen"
            value={post.postImage}
            onChange={(e) => setPost({ ...post, postImage: e.target.value })}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="Descripcion"></label>
          <textarea
            className="form-control"
            id="postDesc"
            rows="7"
            placeholder="Descripcion"
            value={post.postDesc}
            onChange={(e) => setPost({ ...post, postDesc: e.target.value })}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-outline-dark btn-block">
          Crear Post
        </button>
      </form>
    </div>
  );
}
