import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Card from '../Card'
import Post from "./Post";
import { Link } from "react-router-dom";
import { parseTwoDigitYear } from "moment";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    return axios.get("http://localhost:8080/all-posts");
  };

  useEffect(() => {
    console.log("Funcionando");
    const allPosts = getPosts();
    allPosts.then((res) => {
      setPosts(res.data.result);
    });
  }, []);

  //console.log(posts)

  return (
      <div className="row justify-content-center">
          {posts.map((post) => {
          return (
              <Post key={post.id_post} post={post}></Post> 
          );
        })}
        </div>
      
  );
}

/*<ul className="list-group list-group-flush bg-light"></ul> */

/*

*/