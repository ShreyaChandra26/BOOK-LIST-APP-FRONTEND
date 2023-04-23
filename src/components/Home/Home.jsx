import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import { FaSearch, FaPizzaSlice, FaHackerNewsSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilter] = useState("");

  const recepiDetails = (id) => {
    navigate("/detail/" + id);
  };

  useEffect(() => {
    fetch("https://book-list-backend-ni7b.onrender.com/books", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="navb">
        <Navbar />
      </div>

      <div className="note-main py-3">
        <div className="search-bar" style={{marginLeft:"300px"}}>
          <FaSearch className="srch-icon" style={{ marginRight: "-280px"}} />
          <input
            type="search"
            className="search"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </div>
        <div className="main-all-note">
          <div className="all-notes mt-2">
            {data.map((res) => {
              return (
                <>
                  <div
                    className="note-div mt-3"
                    onClick={() => {
                      recepiDetails(res._id);
                    }}
                  >
                    <h4 className="">{res.title}</h4>
                    <p>{res.description}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
