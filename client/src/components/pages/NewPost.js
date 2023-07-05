import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, uploadImages } from "../../main";

const NewPost = ({ data = null, edit = false }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [images, setImages] = useState([]);
  const [displayImages, setDisplayImages] = useState(
    data?.images?.map((img) => `http://127.0.0.1:5000/${img}`) || []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const username = localStorage.getItem("user_name") || null;
  const userId = localStorage.getItem("userid") || null;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...files]);
    setDisplayImages((prevImages) => [...prevImages, ...newImages]);
  };
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setImages([]);
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      if (!title || !description) {
        setErrorMessage("Fill all the mandatory fields");
      } else {
        updateOldPost();
      }
    } else {
      if (!title || !description || !images || !images?.length) {
        setErrorMessage("Fill all the mandatory fields");
      } else {
        saveNewPost();
      }
    }
  };

  const saveNewPost = async () => {
    try {
      let formdata = new FormData();
      images.forEach((image) => {
        formdata.append("files", image);
      });
      const res = await uploadImages(userId, formdata);
      const body = {
        title: title,
        description: description,
        images: [...res.data?.fileLocations],
        owner: userId,
      };
      await fetchData("/post/new", body, "POST");

      clearForm();
      navigate("/profile/feed");
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
  const updateOldPost = async () => {
    try {
      let fileLocations = [];
      if (images?.length) {
        let formdata = new FormData();
        images.forEach((image) => {
          console.log(image);
          formdata.append("files", image);
        });
        const res = await uploadImages(userId, formdata);
        fileLocations = res.data?.fileLocations;
      }
      const body = {
        ...data,
        title: title,
        description: description,
        images: [...data?.images, ...fileLocations],
        owner: userId,
      };
      await fetchData(`/post/${data?.post_id}`, body, "PUT");

      clearForm();
      navigate("/profile/feed");
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="text-black-50">{edit ? "Update" : "New"} Post</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="card mb-3">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <img
              src={"https://dummyimage.com/30x30/000/fff"}
              alt="Avatar"
              className="mr-2 rounded-circle"
            />
            <h6 style={{ flex: "1" }} className="mb-0 mx-1">
              {username}
            </h6>
          </div>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-md-6">
              <div>
                {displayImages.length > 0 ? (
                  <>
                    <div id="carouselExample" class="carousel slide">
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            src={displayImages[0]}
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        {displayImages?.map((image) => (
                          <div key={image} class="carousel-item">
                            <img
                              src={image}
                              class="d-block w-100"
                              alt={image}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <p>No images selected</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    placeholder="Enter description"
                    value={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="images">Images</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="images"
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <button
          onClick={handlePostSubmit}
          type="submit"
          className="btn btn-primary mt-1  py-1 px-4"
        >
          Post
        </button>
      </div>
    </>
  );
};

export default NewPost;
