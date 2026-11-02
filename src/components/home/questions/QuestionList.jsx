import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { createQuestion, fetchQuestions, fetchSpecies } from "../../../lib/api";
import { timeAgo } from "../../../lib/time";

const fieldClass =
  "block w-full bg-neutral-900 rounded-md p-2 border border-green-900 focus:border-green-500 focus:outline-none";

const QuestionList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [species, setSpecies] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [speciesId, setSpeciesId] = useState("");

  useEffect(() => {
    fetchQuestions().then(setQuestions).catch((err) => toast.error(err.message));
    fetchSpecies().then(setSpecies).catch(() => {});
  }, []);

  const ask = async (event) => {
    event.preventDefault();
    try {
      const { id } = await createQuestion({ userId: user.id, title: title.trim(), body: body.trim(), speciesId: speciesId || null });
      navigate(`/questions/${id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <h1 className="fancy text-3xl text-green-500 mb-4">Questions &amp; answers</h1>
      <form onSubmit={ask} className="bg-neutral-800/60 rounded-md p-4 mb-6 shadow-lg shadow-neutral-950 space-y-3">
        <input aria-label="Question title" placeholder="Ask the community…" value={title} onChange={(e) => setTitle(e.target.value)} minLength={5} maxLength={150} required className={fieldClass} />
        <textarea aria-label="Details" placeholder="Details (optional)" value={body} onChange={(e) => setBody(e.target.value)} className={`${fieldClass} h-20`} />
        <div className="flex justify-between">
          <select aria-label="Plant species" value={speciesId} onChange={(e) => setSpeciesId(e.target.value)} className="bg-green-500 text-neutral-800 text-sm px-3">
            <option value="">Any plant</option>
            {species.map((s) => <option key={s.id} value={s.id}>{s.common_name}</option>)}
          </select>
          <button type="submit" className="bg-green-500 text-neutral-800 px-3 pt-1 rounded-sm hover:opacity-80">Ask</button>
        </div>
      </form>
      {questions === null && <p className="text-neutral-400">Loading…</p>}
      <ul>
        {questions?.map((q) => (
          <li key={q.id}>
            <Link to={`/questions/${q.id}`} className="block bg-neutral-800/60 rounded-md p-4 mb-3 shadow-lg shadow-neutral-950 hover:bg-green-500/30 transition">
              <p className="text-lg">{q.title}</p>
              <p className="text-sm text-neutral-400">
                @{q.author.username} · {timeAgo(q.created_at)}
                {q.species && ` · ${q.species.common_name}`} · {q.answers[0]?.count ?? 0} {q.answers[0]?.count === 1 ? "answer" : "answers"}
                {q.accepted_answer_id && <span className="text-green-500"> · Solved</span>}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuestionList;
