import axios from "axios";

export const fetchData = async (route = "", data = {}, methodType) => {
  const config = {
    method: methodType,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  if (methodType === "GET") delete config.body;
  const response = await fetch(`http://localhost:5000${route}`, config);
  console.log(response);

  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
};

export const uploadImages = async (id, formdata) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/upload/post/${id}`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};
