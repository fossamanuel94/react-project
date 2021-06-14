import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import ComentsList from '../comments/ComentsList'
import AddComent from '../comments/AddComent'

export default function SelectedPost() {

    const {id} = useParams()
    const [post, setPost] = useState({})

    const ReturnPost = (id) =>{
        return axios.get(`http://localhost:8080/post/${id}`)
    }

    useEffect(()=>{
        const result = ReturnPost(id)
        result.then(res=>{
        setPost(res.data.result)   
        })
    },[])

    

    return (
        <div>
            <h1>{post.post_title}</h1>
            <p>{post.post_desc}</p>
            <ComentsList></ComentsList>
            <AddComent></AddComent>
        </div>
    )
}
