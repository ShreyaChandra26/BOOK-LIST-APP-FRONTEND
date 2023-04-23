import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import "./book.css";

export default function AddRecipe() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch(`https://book-list-backend-ni7b.onrender.com/book/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setTitle(data.data.title);
        setDesc(data.data.desc);
      });
  }, []);

  const handleSubmit = () => {
    fetch(`https://book-list-backend-ni7b.onrender.com/update/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: desc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
          return;
        } else {
          navigate("/books");
          alert("Book updated successfully");
          navigate("/books");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="navb">
        <Navbar />
      </div>

      <div className="text-white note-cntainer py-5">
        <div>
          <label htmlFor="">Title</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="">Description</label>
          <br />
          <input
            className="py-4"
            type="text"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>

        <div className="mt-3">
          <button
            className="btn0"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
