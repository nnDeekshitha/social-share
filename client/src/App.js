import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/pages/Login";
import RegisterPage from "./components/pages/Register";
import ProfilePage from "./components/pages/Profile";
import HomePage from "./components/pages/HomePage";
import Posts from "./components/Posts";
import NewPost from "./components/pages/NewPost";
import FollowerFollowingPage from "./components/pages/FollowerFollowingPage";
import "./App.css";
import Users from "./components/Users";
import MyPosts from "./components/MyPosts";
import EditPost from "./components/pages/EditPost";
import ProfileUpdate from "./components/pages/ProfileUpdate";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />}>
              <Route exact path="/profile" element={<ProfileUpdate />} />
              <Route exact path="/profile/feed" element={<Posts />} />
              <Route exact path="/profile/my-post" element={<MyPosts />} />
              <Route exact path="/profile/new" element={<NewPost />} />
              <Route exact path="/profile/post/:id" element={<EditPost />} />
              <Route exact path="/profile/search" element={<Users />} />
              <Route
                exact
                path="/profile/follow"
                element={<FollowerFollowingPage />}
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
