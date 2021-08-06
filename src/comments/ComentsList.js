import React,{useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import "../App.css"

export default function ComentsList({id}) {

    const[comments, setComments]=useState([])

    useEffect(()=>{
        const res = axios(`http://localhost:8080/comments/${id}`)
        res.then(result=>{
            setComments(result.data.result)
        })
    }, [])

    return (
        <>
            {comments.map(eachComment=>{
                const {id_comment, user_nickname, comment_date, comment, user_image} = eachComment
                return(
                    <div className="comment-container" key={id_comment}>
                        <div className="comment-user-box">
                            <img className="comment-user-img" alt="..." src={user_image ? user_image : "https://images.assetsdelivery.com/thumbnails/thesomeday123/thesomeday1231709/thesomeday123170900021.jpg"}/>
                            <p className="comment-user-name">{user_nickname}</p>
                            <p className="comment-date">{moment(comment_date).format('l')}</p>
                        </div>
                        <p className="comment-content">{comment}</p>
                    </div>
                )
            })}
        </>
    )
}
