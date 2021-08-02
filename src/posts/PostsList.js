import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Post from "./Post";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    return axios.get("http://localhost:8080/posts/all-posts");
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
    <div className="container-card">
      <div className="row-card">
          {posts.map((post) => {
          return (
              <Post key={post.id_post} post={post}></Post> 
          );
        })}
      </div>
    </div>
      
  );
}
