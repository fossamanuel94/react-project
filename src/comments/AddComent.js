import React, {useState} from "react";
import axios from 'axios';

export default function AddComent({id}) {

    const [coment, setComent] = useState("");

    const sendComment = (token) =>{
      return axios.post("http://localhost:8080/add-comment",
      {
        id_post: id,
        comment: coment
      },
      {
        headers: {authorization: "Bearer " + token}
      }
      )
    }

    const TokenFunction = (tokenR) => {
      return axios.post("http://localhost:8080/token", { token: tokenR });
    };

    const handleSubmit = async (e)=>{
      e.preventDefault()
      const tokens = sessionStorage.getItem("Tokens");
      const parsedTokens = JSON.parse(tokens);
      if(coment===""){
        console.log("Completar el campo")
      }
      if(parsedTokens===null){
        console.log("Inicie Sesion para comentar")    
      }else{
        //console.log(parsedTokens.tokenA)
        const result = await sendComment(parsedTokens.tokenA)
        if(result.data.message === "jwt expired"){
          const newToken = await TokenFunction(parsedTokens.tokenR);
          const newResult = await sendComment(newToken.data.tokenA)
        }
      }
      setComent("")
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Comentario"></label>
          <textarea
            className="form-control"
            id="coment"
            rows="4"
            placeholder="Comentar"
            value={coment}
            onChange={(e) => setComent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-outline-success btn-block">
          Comentar
        </button>
      </form>
    </div>
  );
}
