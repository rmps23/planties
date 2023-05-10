import React from "react";
import { RiLeafFill } from "react-icons/ri";

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map((post, index) => {
        return (
          <div
            key={index}
            className="bg-neutral-800/60 mb-6 rounded-md p-4 shadow-lg shadow-neutral-950"
          >
            <div className="border-b border-neutral-500/50 pb-2 mb-2 flex justify-between">
              <p className="text-neutral-100">{post.user}</p>
              <p className="text-green-500 flex">
                {post.plantType}
                <RiLeafFill className="ml-1" />
              </p>
            </div>
            <div className="my-2">
              <p className="text-neutral-100 p-1">{post.text}</p>
            </div>
            {post.hasPhoto ? (
              <div>
                <img
                  src={`assets/plants/${post.photo}`}
                  className="rounded-md shadow-lg shadow-neutral-950"
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Posts;
