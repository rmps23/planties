import React from "react";
import TopNavbar from "./navbar/top/TopNavbar";
import SideNavbar from "./navbar/side/SideNavbar";
import NewPost from "./posts/NewPost";
import Posts from "./posts/Posts";

import { useEffect, useState } from "react";
import Trending from "./trending/Trending";

const Home = () => {
  const [user, setUser] = useState([]);
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("data/user.json");
      const json = await response.json();
      const response2 = await fetch("data/posts.json");
      const json2 = await response2.json();
      setUser(json);
      setPost(json2);
    };

    fetchData();
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="max-w-7xl mx-auto p-4 py-8 flex">
        <SideNavbar />
        <div className="w-full mt-16 ml-52 mr-10 rounded-md">
          <NewPost data={user} />
          <Posts posts={posts}/>
        </div>
        <div className="rounded-md mb-6 text-neutral-100 max-w-xs w-full mt-16">
          <Trending posts={posts}/>
        </div>
      </div>
    </>
  );
};

export default Home;
