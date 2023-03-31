import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, SetisAuthenticated, loading, SetLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    SetLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/users/logout`,

        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      SetisAuthenticated(false);
      SetLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      SetLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App </h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </article>
    </nav>
  );
};

export default Header;
