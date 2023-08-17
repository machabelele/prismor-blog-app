import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // const posts = [
  //     {
  //       id: 1,
  //       title: "Skincare",
  //       desc: "glow skin",
  //       img: "https://images.app.goo.gl/XsU8pLCEcvaLK6XH6"

  //     },
  //     {
  //       id: 2,
  //       title: "Fashion",
  //       desc: "outfit",
  //       img: "https://pin.it/2ZOEIzZ"
  //     },
  //     {
  //       id: 3,
  //       title: "Apartment",
  //       desc: "aesthetic",
  //       img: "https://pin.it/5j2Dm4H"
  //     },
  //     {
  //       id: 4,
  //       title: "Designer",
  //       desc: "bag",
  //       img: "https://pin.it/37OqMna"
  //     },
  //     {
  //       id: 5,
  //       title: "Selfie",
  //       desc: "instagram",
  //       img: "https://pin.it/Cqi7FYl"
  //     },
  //   ];
  return (
    <div className="menu">
      Menu
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
