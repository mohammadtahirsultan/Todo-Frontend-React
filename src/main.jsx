import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/app.scss";
// export const server = "https://todo-mern-one.vercel.app/api/v1"
export const server = "http://localhost:4000/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, SetisAuthenticated] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [user, SetUser] = useState({});
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        SetisAuthenticated,
        loading,
        SetLoading,
        user,
        SetUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
