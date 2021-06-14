import React, {useState} from "react";

export default function AddComent() {

    const [coment, setComent] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault()
        alert(coment)
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
