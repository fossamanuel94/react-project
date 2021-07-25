import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

export default function CategoriePostList() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  const traerPostCat = () => {
    return axios.get(`http://localhost:8080/categorie-post/${id}`);
  };

  useEffect(() => {
    const listaPosts = traerPostCat();
    listaPosts.then((result) => {
      const res = result.data.data;
      setPosts(res);
    });
  }, [id]);

  return (
    <div class="container-card">
      <div class="row-card">
      {posts.map((post) => {
        return <Post key={post.id_post} post={post}></Post>;
      })}
      </div>
    </div>
  );
}

/**/
