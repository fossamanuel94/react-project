import axios from 'axios';
import React, {useState} from 'react'

export default function Registro() {
    
    const [user, setUser] = useState({
        user_name:"",
        user_email:"",
        user_password:""
    });

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios({
            method:'post',
            url:'http://localhost:8080/add-user',
            data:{
                user_name:user.user_name,
                user_email:user.user_email,
                user_password:user.user_password
            }
        }).then((res)=>{
            console.log(res)
            setUser({
                user_name:"",
                user_email:"",
                user_password:""
            })
        })
        console.log(user);
    }

    return (
        <div className="container jumbotron w-25 shadow p-3 mb-5 bg-white rounded border border-success">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="userName">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              placeholder="Nombre"
              value={user.user_name}
              onChange={(e)=> setUser({...user, user_name: e.target.value})}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="userEmailR"
              name="userEmailR"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={user.user_email}
              onChange={(e)=> setUser({...user, user_email:e.target.value})}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="userPasswordR"
              placeholder="Password"
              name="userPasswordR"
              value={user.user_password}
              onChange={(e)=> setUser({...user, user_password:e.target.value})}
            ></input>
            <br></br>
            <button type="submit" className="btn btn-outline-success btn-block">
              Registro
            </button>
          </div>
        </form>
      </div>
    )
}
