import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Post from "./Post";
import { Link } from "react-router-dom";

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
    <div>
      <ul className="list-group list-group-flush bg-light">
        {posts.map((post) => {
          return (
            <div key={post.id_post}>
              <Post post={post}></Post>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
