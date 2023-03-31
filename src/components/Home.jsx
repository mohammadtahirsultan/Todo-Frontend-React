import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Context, server } from "../main";
import TodoItem from "./TodoItem";
import { Navigate } from "react-router-dom/dist";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, SetLoading] = useState(false);
  const [tasks, SetTask] = useState([]);
  const [refresh, SetRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);
  const updateHandler = async (id) => {
    try {
      await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      SetRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      SetRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      SetisAuthenticated(true);
      SetLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      SetLoading(false);
    }
  };

  useEffect(() => {
    SetLoading(true);
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        SetTask(res.data.user);
        SetLoading(false);
      })
      .catch((error) => {
        SetLoading(false);

        // error.response.data.message
      });
  }, [refresh]);


  if(!isAuthenticated) return <Navigate to={"/login"} />
  
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              required
              placeholder="Enter Title of the Task"
            />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              required
              placeholder="Enter Description of the Task"
            />

            <button disabled={loading} type="submit" className="btn">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            key={i._id}
            id={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
