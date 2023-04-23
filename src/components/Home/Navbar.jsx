import React from "react";
import { MdAdd, MdClose, MdHome, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const DeleteAll = () => {
    fetch("https://book-list-backend-ni7b.onrender.com/deleteAll", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error.message);
          return;
        } else {
          alert("All books deleted successfully");
        }
      })
      .catch((e) => console.log(e));
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div style={{ textAlign: "left" }} className="navb py-4">
        <div onClick={() => navigate("/books")}>
          <span>
            <MdHome style={{marginRight:"5px"}} />
          </span>
          Home
        </div>
        <div onClick={() => navigate("/addBook")} style={{marginTop:"5px"}}>
          <MdAdd style={{marginRight:"5px"}}/>
          Add book
        </div>
        <div onClick={() => DeleteAll()} style={{marginTop:"5px"}}>
          <MdClose style={{marginRight:"5px"}} />
          Delete All
        </div>
        <div style={{marginLeft:"900px"}}>
          <MdLogout  style={{marginRight:"-5px",marginTop:"5px"}}/>
        </div>
      </div>
      <div className="logout-btn ms-3" onClick={() => handleLogOut()}>
        Logout
      </div>
    </div>
  );
}
