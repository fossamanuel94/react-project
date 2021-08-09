import React, {useState, useContext} from "react";
import axios from 'axios';
import {userContext} from '../App'

export default function AddComent({id}) {


    const {userState} = useContext(userContext)
    const [comment, setComment] = useState("");

    const sendComment = (token) =>{
      return axios.post("https://manuelfossa-nodejs.herokuapp.com/comments/add-comment",
      {
        id_post: id,
        comment: comment
      },
      {
        headers: {authorization: "Bearer " + token}
      }
      )
    }

    const refreshTokenFunction = (tokenR) => {
      return axios.post("https://manuelfossa-nodejs.herokuapp.com/jwt/token", { token: tokenR });
    };

    const commentSubmit = async (e)=>{
      e.preventDefault()
      const tokens = sessionStorage.getItem("Tokens");
      const parsedTokens = JSON.parse(tokens);
      if(!userState){
        //console.log("Inicie Sesion para comentar")
      } 
      if(comment!==""){
        const result = await sendComment(parsedTokens.tokenA)
        if(result.data.message === "jwt expired"){
          const newToken = await refreshTokenFunction(parsedTokens.tokenR);
          const newResult = await sendComment(newToken.data.tokenA)
          //console.log(newResult)
        }    
      }else{
        //console.log("Completar el campo")
      }  
      window.location.reload();
      setComment("")
    }

  return (
    <form onSubmit={commentSubmit}>
      <textarea 
        className="comment-txt" 
        placeholder={userState ? ("Comenta!") : ("Iniciar Sesion para Comentar")}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button type="submit" className="comment-btn" disabled={!userState}>Comentar</button>
    </form>
  );
}
