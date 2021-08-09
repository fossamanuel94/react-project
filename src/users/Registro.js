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
        user_image:"",
        user_passwordConf:""
    });

    const [phName,setPhName] = useState("Nombre")
    const [phNick,setPhNick] = useState("Nickname")
    const [phEmail,setPhEmail] = useState("Email")
    const [phImage, setPhImage] = useState("Image (URL)")
    const [phPass,setPhPass] = useState("Contraseña")
    const [phPassConf,setPhPassCongf] = useState("Repetir Contraseña")
    const [nameStyle, setNameStyle] = useState("input-form")
    const [passStyle, setPassStyle] = useState("input-form")
    const [passConfStyle, setPassConfStyle] = useState("input-form")
    const [emailStyle, setEmailStyle] = useState("input-form")
    const [nickStyle, setNickStyle] = useState("input-form")
    const [imageStyle, setImageStyle] = useState("input-form")

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(user.user_name===""){
          setNameStyle("input-form invalid")
          setPhName("Complete el campo")
        }
        if(user.user_email===""){
          setEmailStyle("input-form invalid")
          setPhEmail("Complete el campo")
        }
        if(user.user_password===""){
          setPassStyle("input-form invalid")
          setPhPass("Complete el campo")
        }
        if(user.user_nickname===""){
          setNickStyle("input-form invalid")
          setPhNick("Complete el campo")
        }
        if(user.user_passwordConf===""){
          setPassConfStyle("input-form invalid")
          setPhPassCongf("Complete el campo")
        }
        if(user.user_image===""){
          setImageStyle("input-form invalid")
          setPhImage("Complete el campo")
        }
        else{
          //console.log(user)
          const result = await postUser(user)
          alert(result.data)
          history.push("/")
        }
    }

    const postUser = (data) =>{
      const {user_name, user_email, user_password, user_nickname, user_image} = data
      return axios({
        method:'post',
        url:'https://manuelfossa-nodejs.herokuapp.com/users/add-user',
        data:{
            user_name,
            user_email,
            user_password,
            user_nickname,
            user_image
        }
      })
    }

    const handlePassConfirm = (value) =>{
      if(value===user.user_password) setPassConfStyle("input-form valid")
      if(value!==user.user_password && value!=="") setPassConfStyle("input-form invalid")
      if(value==="") {
        setPassConfStyle("input-form")
        setPhPassCongf("Repetir Contraseña")
      }

    }

    const handleBlurEmail = async(email) =>{
      //console.log(email)
      if(email!==""){
      const res = await axios.get(
        `https://manuelfossa-nodejs.herokuapp.com/users/email-validation/${email}`
      )
      //console.log(res.data)
      if(res.data===""){
        setEmailStyle("input-form valid")
      }
      else setEmailStyle("input-form invalid")
      }
    }

    const handleBlurNick = async(nick) =>{
      //console.log(email)
      if(nick!==""){
      const res = await axios.get(
        `https://manuelfossa-nodejs.herokuapp.com/users/nick-validation/${nick}`
      )
      //console.log(res.data)
      if(res.data===""){
        setNickStyle("input-form valid")
      }
      else setNickStyle("input-form invalid")
      }
    }

    return (
      <form className="container-register" onSubmit={handleSubmit}>
        <p className="title-form">Registrate</p>
        <input 
          type="text" 
          className={nameStyle} 
          placeholder={phName}
          value={user.user_name}
          onChange={(e)=> setUser({...user, user_name: e.target.value})}
          onFocus={()=>setNameStyle("input-form")}
        />
        <input 
          type="text" 
          className={nickStyle}
          placeholder={phNick}
          value={user.user_nickname}
          onChange={(e)=> setUser({...user, user_nickname:e.target.value})}
          onBlur={(e)=> handleBlurNick(e.target.value)}
          onFocus={()=>setNickStyle("input-form")}
        />
        <input 
          type="email" 
          className={emailStyle} 
          placeholder={phEmail}
          value={user.user_email}
          onChange={(e)=> setUser({...user, user_email:e.target.value})}
          onBlur={(e)=> handleBlurEmail(e.target.value)}
          onFocus={()=>setEmailStyle("input-form")}
        />
        <input
          type="text"
          className={imageStyle}
          placeholder={phImage}
          value={user.user_image}
          onChange={(e)=> setUser({...user, user_image:e.target.value})}
          onFocus={()=>setImageStyle("input-form")}
        />
        <input 
          type="password" 
          className={passStyle}
          placeholder={phPass}
          value={user.user_password}
          onChange={(e)=> setUser({...user, user_password:e.target.value})}
          onFocus={()=>setPassStyle("input-form")}
        />
        <input 
          type="password" 
          className={passConfStyle}
          placeholder={phPassConf}
          value={user.user_passwordConf}
          onChange={(e)=>{setUser(({...user,user_passwordConf:e.target.value}),handlePassConfirm(e.target.value))}} 
        />
        <button type="submit" className="btn-form">Registrarse</button>
      </form>
    )
}

