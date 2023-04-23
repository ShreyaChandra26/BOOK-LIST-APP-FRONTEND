import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://book-list-backend-ni7b.onrender.com/book/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setData(data.data);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`https://book-list-backend-ni7b.onrender.com/delete/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/books");
        alert("Deleted successfully");
      });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <>
      <div className="navb">
        <Navbar />
      </div>

      <div className="note-flex">
        <div className="note-details py-5 px-5">
          <div className="note-detail">
            <h2>{data.title}</h2>
          </div>
          <div className="note-para">
            <p>{data.description}</p>
          </div>
          <div className="btns">
            <button
              className="btn-up"
              onClick={() => {
                handleDelete(data._id);
              }}
            >
              Delete
            </button>
            <button
              className="btn-up"
              onClick={() => {
                handleUpdate(data._id);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
