import { client } from "./neon";

const POST_SELECT =
  "id, body, image_url, created_at, author:profiles!posts_author_id_fkey(id, username, avatar_url), species(id, common_name, slug), likes(user_id), comments(count)";

const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

export const fetchPosts = ({ authorId, speciesId } = {}) => {
  let query = client
    .from("posts")
    .select(POST_SELECT)
    .order("created_at", { ascending: false })
    .limit(20);
  if (authorId) query = query.eq("author_id", authorId);
  if (speciesId) query = query.eq("species_id", speciesId);
  return query.then(unwrap);
};

// No file storage: photos are shrunk in the browser and stored as a data: URL in posts.image_url.
export const imageToDataUrl = async (file, maxSize = 800, quality = 0.7) => {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
};

export const createPost = async ({ userId, body, speciesId, file }) => {
  const image_url = file ? await imageToDataUrl(file) : null;
  return client
    .from("posts")
    .insert({ author_id: userId, body, species_id: speciesId || null, image_url })
    .then(unwrap);
};

export const deletePost = (id) => client.from("posts").delete().eq("id", id).then(unwrap);

export const setLike = (postId, userId, liked) =>
  liked
    ? client.from("likes").insert({ post_id: postId, user_id: userId }).then(unwrap)
    : client.from("likes").delete().eq("post_id", postId).eq("user_id", userId).then(unwrap);

export const fetchComments = (postId) =>
  client
    .from("comments")
    .select("id, body, created_at, author:profiles!comments_author_id_fkey(username)")
    .eq("post_id", postId)
    .order("created_at")
    .then(unwrap);

export const addComment = (postId, userId, body) =>
  client.from("comments").insert({ post_id: postId, author_id: userId, body }).then(unwrap);

export const fetchSpecies = () =>
  client.from("species").select("*").order("common_name").then(unwrap);

export const fetchSpeciesBySlug = (slug) =>
  client.from("species").select("*").eq("slug", slug).maybeSingle().then(unwrap);

export const fetchProfile = (username) =>
  client.from("profiles").select("*").eq("username", username).maybeSingle().then(unwrap);

export const updateBio = (userId, bio) =>
  client.from("profiles").update({ bio }).eq("id", userId).then(unwrap);

export const fetchQuestions = () =>
  client
    .from("questions")
    .select("id, title, created_at, accepted_answer_id, author:profiles!questions_author_id_fkey(username), species(common_name), answers!answers_question_id_fkey(count)")
    .order("created_at", { ascending: false })
    .then(unwrap);

export const fetchQuestion = (id) =>
  client
    .from("questions")
    .select("*, author:profiles!questions_author_id_fkey(username), species(common_name, slug)")
    .eq("id", id)
    .maybeSingle()
    .then(unwrap);

export const createQuestion = ({ userId, title, body, speciesId }) =>
  client
    .from("questions")
    .insert({ author_id: userId, title, body, species_id: speciesId || null })
    .select("id")
    .single()
    .then(unwrap);

export const fetchAnswers = (questionId) =>
  client
    .from("answers")
    .select("id, body, created_at, author:profiles!answers_author_id_fkey(username)")
    .eq("question_id", questionId)
    .order("created_at")
    .then(unwrap);

export const addAnswer = (questionId, userId, body) =>
  client.from("answers").insert({ question_id: questionId, author_id: userId, body }).then(unwrap);

export const acceptAnswer = (questionId, answerId) =>
  client.from("questions").update({ accepted_answer_id: answerId }).eq("id", questionId).then(unwrap);
