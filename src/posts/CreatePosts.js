import axios from "axios";
import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import CategorieSelect from "./CategorieSelect";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Posts() 
{
  const history = useHistory()
  const [post, setPost] = useState({
    postDesc: "",
    postTitle: "",
    postSubtitle: "",
    postImage: "",
    postCateg: 1,
  });


  const [alertState, setAlertState] = useState(true)

  const categorieSelect = (categorie) => {
    setPost({ ...post, postCateg: categorie });
  };

  const handleEditor = (e, editor) => {
    const data = editor.getData();
    setPost({ ...post, postDesc: data });
  };

  const createPost = (data) => {
    const { post_title, post_image, post_desc, post_categ, post_subtitle } = data.postSended;
    return axios.post(
      "http://localhost:8080/posts/add-post",
      {
        post_desc,
        post_title,
        post_subtitle,
        post_image,
        post_categ,
      },
      {
        headers: { Authorization: "Bearer " + data.token },
      }
    );

    //console.log(data.token)
  };

  const TokenFunction = (tokenR) => {
    return axios.post("http://localhost:8080/jwt/token", { token: tokenR });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(post.postTitle==="" || post.postSubtitle==="" || post.postImage==="" || post.postDesc===""){
      setAlertState(false)
    }
    else{
      const tokens = sessionStorage.getItem("Tokens");
      const parsedTokens = JSON.parse(tokens);
      //console.log(parsedTokens.tokenR);
      const data = {
        postSended: {
          post_desc: post.postDesc,
          post_title: post.postTitle,
          post_subtitle: post.postSubtitle,
          post_image: post.postImage,
          post_categ: post.postCateg,
        },
        token: parsedTokens.tokenA,
      };

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
    }
  };

  /* useEffect(()=>{
    if(sessionStorage.getItem("Tokens") === null) history.push("/")
  },[]); */

  useEffect(() => {
    if (post.postCateg === undefined) {
      setPost({ ...post, postCateg: 1 });
    }
    console.log(post);
  }, []);

  return (
    <>
      <form className="container-create-post" onSubmit={handleSubmit}>
        {!alertState ? (
          <div
            className="alert-error"
          >Complete los campos
          </div>
        ) : null}
        <input
          type="text"
          className="input-form"
          placeholder="Titulo"
          value={post.postTitle}
          onChange={(e) => setPost({ ...post, postTitle: e.target.value })}
          onFocus={()=>setAlertState(true)}
        />
        <input
          type="text"
          className="input-form"
          placeholder="Subtitulo"
          value={post.postSubtitle}
          onChange={(e) => setPost({ ...post, postSubtitle: e.target.value })}
          onFocus={()=>setAlertState(true)}
        />
        <input
          type="text"
          className="input-form"
          placeholder="Imagen"
          value={post.postImage}
          onChange={(e) => setPost({ ...post, postImage: e.target.value })}
          onFocus={()=>setAlertState(true)}
        />
        <CategorieSelect selectCateg={categorieSelect}></CategorieSelect>
        <CKEditor
          className="txt-editor"
          editor={ClassicEditor}
          onChange={handleEditor}
          config={{
            toolbar: [
              "bold",
              "italic",
              "underline",
              "link",
              "undo",
              "redo",
              "numberedList",
              "bulletedList",
              "blockQuote"
            ],
          }}
          onFocus={()=>setAlertState(true)}
        ></CKEditor>
        <button type="submit" className="btn-form">Crear Post</button>
      </form>
    </>
  );
}
