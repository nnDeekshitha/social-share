import React, { useState, useEffect } from "react";
import { fetchData } from "../main";
import Card from "./Card";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const id = localStorage.getItem("userid" || null);
  useEffect(() => {
    if (id) {
      fetchData_(id);
    }
  }, [id]);

  const fetchData_ = async (id) => {
    try {
      const res = await fetchData(`/post/user/${id}`, {}, "GET");
      setPosts(res.posts || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts.map((post) => (
        <div className="mb-3" key={post?.post_id}>
          <Card data={post} />
        </div>
      ))}
    </>
  );
};

export default MyPosts;
