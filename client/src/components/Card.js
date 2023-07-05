import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../main";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const user = {
    username: data?.owner?.user_name,
    id: data?.owner?.id,
    avatar: "https://dummyimage.com/30x30/000/fff",
  };
  const userId = localStorage.getItem("userid") || null;

  const images =
    data?.images?.map((image) => `http://127.0.0.1:5000/${image}`) || [];
  console.log(images);
  const post = {
    title: data?.title,
    description: data?.description,
    likes: data?.likes || "__,___",
    comments: data?.comments || "___",
  };

  const showDate = () => {
    const date = data?.date_created ? new Date(data?.date_created) : new Date();
    const getMonth = (month) => {
      switch (month) {
        case 1:
          return "January";
        case 2:
          return "February";
        case 3:
          return "March";
        case 4:
          return "April";
        case 5:
          return "May";
        case 6:
          return "June";
        case 7:
          return "July";
        case 8:
          return "October";
        case 9:
          return "September";
        case 10:
          return "October";
        case 11:
          return "November";
        case 12:
          return "December";
        default:
          break;
      }
    };
    return (
      <>
        {getMonth(date?.getMonth() + 1)}, {date?.getDate()}
      </>
    );
  };

  const handleDeletePost = async () => {
    try {
      await fetchData(`/post/${data?.post_id}`, {}, "DELETE");
      navigate(0);
    } catch (error) {}
  };
  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex align-items-center">
          <img
            src={user?.avatar}
            alt="Avatar"
            className="mr-2 rounded-circle"
          />
          <h6 style={{ flex: "1" }} className="mb-0 mx-1">
            {user?.username}
          </h6>
          {userId === data?.owner?._id ? (
            <div className="ml-auto">
              <Link to={`/profile/post/${data?.post_id}`}>
                <button className="btn btn-warning py-0 mx-3">
                  <i className="fa fa-edit" aria-hidden="true"></i>
                </button>
              </Link>
              <button
                onClick={handleDeletePost}
                className="btn btn-danger py-0 "
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div
              id="carouselExample"
              class="carousel slide"
              style={{ maxHeight: "150px" }}
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    style={{ maxHeight: "150px" }}
                    src={images[0]}
                    class="d-block mx-auto"
                    alt="..."
                  />
                </div>
                {images.slice(1)?.map((image) => (
                  <div key={image} class="carousel-item">
                    <img
                      style={{ maxHeight: "150px" }}
                      src={image}
                      class="d-block mx-auto"
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
          </div>
          <div className="col-md-6 d-flex flex-column">
            <h5 className="card-title">{post.title}</h5>
            <div style={{ flex: "1" }}>
              <p className="card-text">{post.description}</p>
              <span className="text-black-50">
                {post.comments?.toLocaleString()} comments
              </span>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between">
                <div>
                  <i className="fa fa-heart text-danger" aria-hidden="true"></i>{" "}
                  {post.likes?.toLocaleString()} likes
                </div>
                <span className="text-black-50">{showDate()}</span>
              </div>
            </div>
            <div className="d-none">
              <input
                type="text"
                placeholder="Add a comment"
                className="w-100"
              />
              <button className="btn btn-primary py-1 px-3">post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
