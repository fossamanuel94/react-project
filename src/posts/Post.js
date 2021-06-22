import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import moment from 'moment';

export default function Post(props) {
  //console.log(props)
  /*const [post, setPost] = useState({
        id : props.post.id_post,
        title : props.post.post_title,
        desc : props.post.post_desc,
        image : props.post.post_image
    })*/
    

  return (
    <div className="container">
      <hr className="solid m-auto"></hr>
      <div className="row">
        <div className="col-2">
          <img
            src={props.post.post_image}
            alt={props.post.post_title}
            className="rounded float-start m-1"
            width="115"
            height="70"
          ></img>
        </div>
        <div className="col-10">
          <Link to={`/post/${props.post.id_post}`}>
            <h5 className="m-1">{props.post.post_title}</h5>
          </Link>
          <div className="row">
            <div className="col-3">
              <h6 className="m-1">by: {props.post.user_nickname}</h6>
            </div>
            <div className="col-1"></div>
            <div className="col-3 m-1">
              <h6>{moment(props.post.post_date).startOf().fromNow()}</h6>
            </div>
            <div className="row border border-success rounded-pill">
              <div className="col-1 m-1">
                <GoThumbsup color="green"></GoThumbsup>
              </div>
              <div className="col-1 m-1">7</div>
            </div>
            <div className="col-1"></div>
            <div className="row border border-danger rounded-pill">
              <div className="col-1 m-1">
                <GoThumbsdown color="red"></GoThumbsdown>
              </div>
              <div className="col-1 m-1">9</div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 m-1">
              in: {props.post.categorie}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
