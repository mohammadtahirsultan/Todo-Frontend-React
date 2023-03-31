import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "./Loader";

const Profile = () => {
  
  const { isAuthenticated, user, loading, SetLoading } = useContext(Context);

  console.log(user);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>ni{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
