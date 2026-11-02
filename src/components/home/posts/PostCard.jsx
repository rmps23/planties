import { useState } from "react";
import { Link } from "react-router-dom";
import { RiLeafFill, RiHeart3Fill, RiHeart3Line, RiChat3Line, RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { addComment, deletePost, fetchComments, setLike } from "../../../lib/api";
import { timeAgo } from "../../../lib/time";

const PostCard = ({ post, onChange }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes.map((l) => l.user_id));
  const [commentCount, setCommentCount] = useState(post.comments[0]?.count ?? 0);
  const [comments, setComments] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const liked = likes.includes(user.id);

  const toggleLike = async () => {
    const next = !liked;
    setLikes((prev) => (next ? [...prev, user.id] : prev.filter((id) => id !== user.id)));
    try {
      await setLike(post.id, user.id, next);
    } catch (err) {
      setLikes((prev) => (next ? prev.filter((id) => id !== user.id) : [...prev, user.id]));
      toast.error(err.message);
    }
  };

  const toggleComments = async () => {
    const next = !open;
    setOpen(next);
    if (next && comments === null) {
      try {
        setComments(await fetchComments(post.id));
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const submitComment = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    try {
      await addComment(post.id, user.id, text.trim());
      setText("");
      setCommentCount((c) => c + 1);
      setComments(await fetchComments(post.id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(post.id);
      onChange();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <article className="bg-neutral-800/60 mb-6 rounded-md p-4 shadow-lg shadow-neutral-950">
      <div className="border-b border-neutral-500/50 pb-2 mb-2 flex justify-between">
        <p className="text-neutral-100">
          <Link to={`/u/${post.author.username}`} className="hover:underline">@{post.author.username}</Link>
          <span className="text-neutral-400 text-sm ml-2">{timeAgo(post.created_at)}</span>
        </p>
        {post.species && (
          <Link to={`/plants/${post.species.slug}`} className="text-green-500 flex items-center hover:underline">
            {post.species.common_name}
            <RiLeafFill className="ml-1" aria-hidden="true" />
          </Link>
        )}
      </div>
      <p className="text-neutral-100 p-1 whitespace-pre-line">{post.body}</p>
      {post.image_url && (
        <img
          src={post.image_url}
          alt={`Photo by @${post.author.username}${post.species ? ` of a ${post.species.common_name}` : ""}`}
          loading="lazy"
          className="rounded-md shadow-lg shadow-neutral-950 mt-2"
        />
      )}

      <div className="flex items-center gap-4 mt-3 text-neutral-300">
        <button type="button" onClick={toggleLike} aria-pressed={liked} className="flex items-center gap-1 hover:text-green-500">
          {liked ? <RiHeart3Fill className="text-green-500" aria-hidden="true" /> : <RiHeart3Line aria-hidden="true" />}
          <span className="sr-only">{liked ? "Unlike" : "Like"}</span>
          {likes.length}
        </button>
        <button type="button" onClick={toggleComments} aria-expanded={open} className="flex items-center gap-1 hover:text-green-500">
          <RiChat3Line aria-hidden="true" />
          <span className="sr-only">Comments</span>
          {commentCount}
        </button>
        {post.author.id === user.id && (
          <button type="button" onClick={remove} aria-label="Delete post" className="ml-auto hover:text-red-500">
            <RiDeleteBinLine aria-hidden="true" />
          </button>
        )}
      </div>

      {open && (
        <div className="mt-3 border-t border-neutral-500/50 pt-3">
          {comments === null && <p className="text-neutral-400 text-sm">Loading…</p>}
          {comments?.map((c) => (
            <p key={c.id} className="text-sm mb-2">
              <Link to={`/u/${c.author.username}`} className="text-green-500 hover:underline">@{c.author.username}</Link>{" "}
              {c.body}
            </p>
          ))}
          <form onSubmit={submitComment} className="flex gap-2 mt-2">
            <input
              aria-label="Write a comment"
              placeholder="Write a comment…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={1000}
              className="flex-1 bg-neutral-900 rounded-sm p-2 text-sm border border-green-900 focus:border-green-500 focus:outline-none"
            />
            <button type="submit" className="bg-green-500 text-neutral-800 px-3 rounded-sm text-sm hover:opacity-80">Send</button>
          </form>
        </div>
      )}
    </article>
  );
};

export default PostCard;
