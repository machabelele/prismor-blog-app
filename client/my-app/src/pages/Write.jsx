import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <lable className="file" htmlFor="file">
            Upload Image
          </lable>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "lifestyle"}
              name="cat"
              value="lifestyle"
              id="lifestyle"
              onChange={(e) => setCat(e.target.value)}
            />
            <lable htmlFor="lifestyle">Lifestyle</lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "fashion"}
              name="cat"
              value="fashion"
              id="fashion"
              onChange={(e) => setCat(e.target.value)}
            />
            <lable htmlFor="fashion">Fashion</lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <lable htmlFor="food">Food</lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "travel"}
              name="cat"
              value="travel"
              id="travel"
              onChange={(e) => setCat(e.target.value)}
            />
            <lable htmlFor="travel">Travel</lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "entertainment"}
              name="cat"
              value="entertainment"
              id="entertainment"
              onChange={(e) => setCat(e.target.value)}
            />
            <lable htmlFor="entertainment">Entertainment</lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "health"}
              name="cat"
              value="health"
              id="health"
            />
            <lable htmlFor="health">Health</lable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
