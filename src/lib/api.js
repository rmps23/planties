import { supabase } from "./supabase";

const POST_SELECT =
  "id, body, image_url, created_at, author:profiles!posts_author_id_fkey(id, username, avatar_url), species(id, common_name, slug), likes(user_id), comments(count)";

const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

export const fetchPosts = ({ authorId, speciesId } = {}) => {
  let query = supabase
    .from("posts")
    .select(POST_SELECT)
    .order("created_at", { ascending: false })
    .limit(50);
  if (authorId) query = query.eq("author_id", authorId);
  if (speciesId) query = query.eq("species_id", speciesId);
  return query.then(unwrap);
};

export const uploadImage = async (userId, file) => {
  const ext = file.name.split(".").pop().toLowerCase();
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("post-images").upload(path, file);
  if (error) throw error;
  return supabase.storage.from("post-images").getPublicUrl(path).data.publicUrl;
};

export const createPost = async ({ userId, body, speciesId, file }) => {
  const image_url = file ? await uploadImage(userId, file) : null;
  return supabase
    .from("posts")
    .insert({ author_id: userId, body, species_id: speciesId || null, image_url })
    .then(unwrap);
};

export const deletePost = (id) => supabase.from("posts").delete().eq("id", id).then(unwrap);

export const setLike = (postId, userId, liked) =>
  liked
    ? supabase.from("likes").insert({ post_id: postId, user_id: userId }).then(unwrap)
    : supabase.from("likes").delete().eq("post_id", postId).eq("user_id", userId).then(unwrap);

export const fetchComments = (postId) =>
  supabase
    .from("comments")
    .select("id, body, created_at, author:profiles!comments_author_id_fkey(username)")
    .eq("post_id", postId)
    .order("created_at")
    .then(unwrap);

export const addComment = (postId, userId, body) =>
  supabase.from("comments").insert({ post_id: postId, author_id: userId, body }).then(unwrap);

export const fetchSpecies = () =>
  supabase.from("species").select("*").order("common_name").then(unwrap);

export const fetchSpeciesBySlug = (slug) =>
  supabase.from("species").select("*").eq("slug", slug).maybeSingle().then(unwrap);

export const fetchProfile = (username) =>
  supabase.from("profiles").select("*").eq("username", username).maybeSingle().then(unwrap);

export const updateBio = (userId, bio) =>
  supabase.from("profiles").update({ bio }).eq("id", userId).then(unwrap);

export const fetchQuestions = () =>
  supabase
    .from("questions")
    .select("id, title, created_at, accepted_answer_id, author:profiles!questions_author_id_fkey(username), species(common_name), answers!answers_question_id_fkey(count)")
    .order("created_at", { ascending: false })
    .then(unwrap);

export const fetchQuestion = (id) =>
  supabase
    .from("questions")
    .select("*, author:profiles!questions_author_id_fkey(username), species(common_name, slug)")
    .eq("id", id)
    .maybeSingle()
    .then(unwrap);

export const createQuestion = ({ userId, title, body, speciesId }) =>
  supabase
    .from("questions")
    .insert({ author_id: userId, title, body, species_id: speciesId || null })
    .select("id")
    .single()
    .then(unwrap);

export const fetchAnswers = (questionId) =>
  supabase
    .from("answers")
    .select("id, body, created_at, author:profiles!answers_author_id_fkey(username)")
    .eq("question_id", questionId)
    .order("created_at")
    .then(unwrap);

export const addAnswer = (questionId, userId, body) =>
  supabase.from("answers").insert({ question_id: questionId, author_id: userId, body }).then(unwrap);

export const acceptAnswer = (questionId, answerId) =>
  supabase.from("questions").update({ accepted_answer_id: answerId }).eq("id", questionId).then(unwrap);
