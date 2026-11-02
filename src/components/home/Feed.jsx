import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import NewPost from "./posts/NewPost";
import Posts from "./posts/Posts";
import Trending from "./trending/Trending";
import { fetchPosts } from "../../lib/api";

const Feed = () => {
  const [posts, setPosts] = useState(null);

  const load = useCallback(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => {
        toast.error(err.message);
        setPosts([]);
      });
  }, []);

  useEffect(load, [load]);

  return (
    <div className="flex gap-10">
      <div className="w-full min-w-0">
        <h1 className="sr-only">Home feed</h1>
        <NewPost onPublished={load} />
        <Posts posts={posts} onChange={load} />
      </div>
      <aside className="hidden lg:block max-w-xs w-full text-neutral-100" aria-label="Trending">
        <Trending posts={posts ?? []} />
      </aside>
    </div>
  );
};

export default Feed;
