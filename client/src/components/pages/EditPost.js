import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../main";
import NewPost from "./NewPost";

const EditPost = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchData_();
  }, []); // eslint-disable-line

  const fetchData_ = async () => {
    try {
      const res = await fetchData(`/post/${id}`, {}, "GET");
      setData(res);
    } catch (error) {}
  };
  return <>{!data ? <>Loading</> : <NewPost data={data} edit={true} />}</>;
};

export default EditPost;
