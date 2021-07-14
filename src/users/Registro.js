import axios from 'axios';
import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

export default function Registro() {
    
    const history = useHistory();
    const [user, setUser] = useState({
        user_name:"",
        user_email:"",
        user_password:"",
        user_nickname:"",
        user_passwordConf:""
    });

    const [phName,setPhName] = useState("")
    const [phNick,setPhNick] = useState("")
    const [phEmail,setPhEmail] = useState("")
    const [phPass,setPhPass] = useState("")
    const [phPassConf,setPhPassCongf] = useState("")
    const [nameStyle, setNameStyle] = useState("form-control")
    const [passStyle, setPassStyle] = useState("form-control")
    const [passConfStyle, setPassConfStyle] = useState("form-control")
    const [emailStyle, setEmailStyle] = useState("form-control")
    const [nickStyle, setNickStyle] = useState("form-control")

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(user.user_name===""){
          setNameStyle("form-control is-invalid")
          setPhName("Complete el campo")
        }
        if(user.user_email===""){
          setEmailStyle("form-control is-invalid")
          setPhEmail("Complete el campo")
        }
        if(user.user_password===""){
          setPassStyle("form-control is-invalid")
          setPhPass("Complete el campo")
        }
        if(user.user_nickname===""){
          setNickStyle("form-control is-invalid")
          setPhNick("Complete el campo")
        }
        if(user.user_passwordConf===""){
          setPassConfStyle("form-control is-invalid")
          setPhPassCongf("Complete el campo")
        }
        else{
          console.log(user)
          const result = await postUser(user)
          alert(result.data)
          history.push("/")
        }
    }

    const postUser = (data) =>{
      const {user_name, user_email, user_password, user_nickname} = data
      return axios({
        method:'post',
        url:'http://localhost:8080/add-user',
        data:{
            user_name,
            user_email,
            user_password,
            user_nickname
        }
      })
    }

    const handlePassConfirm = (value) =>{
      if(value===user.user_password) setPassConfStyle("form-control is-valid")
      if(value!==user.user_password && value!=="") setPassConfStyle("form-control is-invalid")
      if(value==="") {
        setPassConfStyle("form-control")
        setPhPassCongf("")
      }

    }

    const handleBlurEmail = async(email) =>{
      //console.log(email)
      if(email!==""){
      const res = await axios.get(
        `http://localhost:8080/email-validation/${email}`
      )
      console.log(res.data)
      if(res.data===""){
        setEmailStyle("form-control is-valid")
      }
      else setEmailStyle("form-control is-invalid")
      }
    }

    const handleBlurNick = async(nick) =>{
      //console.log(email)
      if(nick!==""){
      const res = await axios.get(
        `http://localhost:8080/nick-validation/${nick}`
      )
      console.log(res.data)
      if(res.data===""){
        setNickStyle("form-control is-valid")
      }
      else setNickStyle("form-control is-invalid")
      }
    }

    return (
        <div className="container jumbotron w-50 shadow p-3 mb-5 bg-white rounded border border-success">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="userName">Nombre</label>
            <input
              type="text"
              className={nameStyle}
              id="userName"
              name="userName"
              placeholder={phName}
              value={user.user_name}
              onChange={(e)=> setUser({...user, user_name: e.target.value})}
              onFocus={()=>setNameStyle("form-control")}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="userNick">Nickname</label>
            <input
              type="text"
              className={nickStyle}
              id="userNick"
              name="userNick"
              placeholder={phNick}
              value={user.user_nickname}
              onChange={(e)=> setUser({...user, user_nickname:e.target.value})}
              onBlur={(e)=> handleBlurNick(e.target.value)}
              onFocus={()=>setNickStyle("form-control")}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              className={emailStyle}
              id="userEmailR"
              name="userEmailR"
              aria-describedby="emailHelp"
              placeholder={phEmail}
              value={user.user_email}
              onChange={(e)=> setUser({...user, user_email:e.target.value})}
              onBlur={(e)=> handleBlurEmail(e.target.value)}
              onFocus={()=>setEmailStyle("form-control")}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              className={passStyle}
              id="userPassword"
              placeholder={phPass}
              name="userPassword"
              value={user.user_password}
              onChange={(e)=> setUser({...user, user_password:e.target.value})}
              onFocus={()=>setPassStyle("form-control")}
            ></input>
            </div>
            <div className="form-group">
              <label htmlFor="userPasswordConf">Confirm Password</label>
              <input
                type="password"
                className={passConfStyle}
                id="userPasswordConf"
                placeholder={phPassConf}
                name="userPasswordConf"
                value={user.user_passwordConf}
                onChange={(e)=>{setUser(({...user,user_passwordConf:e.target.value}),handlePassConfirm(e.target.value))}}  
              ></input>
            </div> 
            <br></br>
            <button type="submit" formMethod="post" className="btn btn-outline-success btn-block">
              Crear Cuenta
            </button>
        </form>
      </div>
    )
}
