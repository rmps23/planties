import PostCard from "./PostCard";

const Posts = ({ posts, onChange }) => {
  if (posts === null) return <p className="text-neutral-400">Loading…</p>;
  if (posts.length === 0) return <p className="text-neutral-400">No posts yet.</p>;
  return posts.map((post) => <PostCard key={post.id} post={post} onChange={onChange} />);
};

export default Posts;
