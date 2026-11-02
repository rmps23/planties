import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Posts from "../posts/Posts";
import { useAuth } from "../../../context/AuthContext";
import { fetchPosts, fetchProfile, updateBio } from "../../../lib/api";

const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(undefined);
  const [posts, setPosts] = useState(null);
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setProfile(undefined);
    setPosts(null);
    fetchProfile(username)
      .then((p) => {
        setProfile(p);
        setBio(p?.bio ?? "");
      })
      .catch((err) => toast.error(err.message));
  }, [username]);

  const profileId = profile?.id;
  const load = useCallback(() => {
    if (profileId) fetchPosts({ authorId: profileId }).then(setPosts).catch((err) => toast.error(err.message));
  }, [profileId]);
  useEffect(load, [load]);

  const saveBio = async (event) => {
    event.preventDefault();
    try {
      await updateBio(user.id, bio);
      setProfile({ ...profile, bio });
      setEditing(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (profile === undefined) return <p className="text-neutral-400">Loading…</p>;
  if (profile === null) return <p>No user called @{username}.</p>;

  const isMe = profile.id === user.id;

  return (
    <>
      <section className="bg-neutral-800/60 rounded-md p-4 mb-6 shadow-lg shadow-neutral-950">
        <h1 className="fancy text-3xl text-green-500">@{profile.username}</h1>
        {editing ? (
          <form onSubmit={saveBio} className="mt-3">
            <textarea
              aria-label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              className="block w-full bg-neutral-900 rounded-md p-2 border border-green-900 focus:border-green-500 focus:outline-none"
            />
            <button type="submit" className="bg-green-500 text-neutral-800 px-3 mt-2 rounded-sm hover:opacity-80">Save</button>
          </form>
        ) : (
          <>
            <p className="mt-2 text-neutral-300">{profile.bio || (isMe ? "Tell people about your plants." : "No bio yet.")}</p>
            {isMe && (
              <button type="button" onClick={() => setEditing(true)} className="text-green-500 text-sm underline mt-2">
                Edit bio
              </button>
            )}
          </>
        )}
      </section>
      <h2 className="sr-only">Posts</h2>
      <Posts posts={posts} onChange={load} />
    </>
  );
};

export default Profile;
