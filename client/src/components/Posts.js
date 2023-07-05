import React, { useState, useEffect } from "react";
import { fetchData } from "../main";
import Card from "./Card";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData_();
  }, []);

  const fetchData_ = async () => {
    try {
      const res = await fetchData(`/post/all`, {}, "GET");
      setPosts(res.posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts.map((post) => (
        <div className="mb-3" key={post.post_id}>
          <Card data={post} />
        </div>
      ))}
    </>
  );
};

export default Posts;
