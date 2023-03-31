import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main";
const App = () => {
  const { user, SetUser, SetisAuthenticated, loading, SetLoading } =
    useContext(Context);

  useEffect(() => {
    SetLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        SetUser(res.data.user);
        SetisAuthenticated(true);
        SetLoading(false);
      })
      .catch((error) => {
        SetUser({});
        SetisAuthenticated(false);
        SetLoading(false);

        // error.response.data.message
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
