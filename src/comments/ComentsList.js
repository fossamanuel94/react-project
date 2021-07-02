import React,{useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import "../App.css"

export default function ComentsList(props) {

    const[comments, setComments]=useState([])

    useEffect(()=>{
        const res = axios(`http://localhost:8080/comments/${props.id}`)
        res.then(result=>{
            setComments(result.data.result)
        })
    }, [])

    return (
        <ul className='list-group list-group-flush mt-2'>
            {comments.map(comment=>{
                return(
                    <li className="list-group-item bg-light" key={comment.id_comment}>
                        <div className="row">
                        <div className="col col-2 small">
                            <p>{comment.user_nickname}</p>
                            <p>{moment(comment.comment_date).startOf().fromNow()}</p>
                        </div>
                        <div className="col space">
                            <p>{comment.comment}</p>
                        </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

/*                       {comment.user_nickname}
                        {comment.comment}
                        {moment(comment.comment_date).startOf().fromNow()} */