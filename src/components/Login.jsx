import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import { Navigate } from "react-router-dom/dist";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const { isAuthenticated, SetisAuthenticated, loading, SetLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      SetisAuthenticated(true);
      SetLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      SetLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            name="email"
            required
            placeholder="Enter Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            name="password"
            required
            placeholder="Enter Password"
          />
          <button disabled={loading} type="submit" className="btn">
            Login
          </button>
          <h4>Or</h4>
          <Link to={"/register"}>Sign Up Here</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
