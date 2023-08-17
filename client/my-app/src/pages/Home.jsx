import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Skincare",
  //     desc: "glow skin",
  //     img: "https://i.pinimg.com/736x/7e/be/db/7ebedb1f9dc1e13a5d16aabe1dcd9005.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Fashion",
  //     desc: "outfit",
  //     img: fashionImage,
  //   },
  //   {
  //     id: 3,
  //     title: "Apartment",
  //     desc: "aesthetic",
  //     img: apartmentImage,
  //   },
  //   {
  //     id: 4,
  //     title: "Designer",
  //     desc: "bag",
  //     img: designerImage,
  //   },
  //   {
  //     id: 5,
  //     title: "Selfie",
  //     desc: "instagram",
  //     img: selfieImage,
  //   },
  // ];

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
