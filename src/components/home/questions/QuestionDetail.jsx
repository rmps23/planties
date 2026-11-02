import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { acceptAnswer, addAnswer, fetchAnswers, fetchQuestion } from "../../../lib/api";
import { timeAgo } from "../../../lib/time";

const QuestionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [question, setQuestion] = useState(undefined);
  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");

  const load = useCallback(() => {
    Promise.all([fetchQuestion(id), fetchAnswers(id)])
      .then(([q, a]) => {
        setQuestion(q);
        setAnswers(a);
      })
      .catch((err) => toast.error(err.message));
  }, [id]);
  useEffect(load, [load]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await addAnswer(id, user.id, text.trim());
      setText("");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const accept = async (answerId) => {
    try {
      await acceptAnswer(id, answerId);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (question === undefined) return <p className="text-neutral-400">Loading…</p>;
  if (question === null) return <p>Question not found. <Link to="/questions" className="underline">Back</Link></p>;

  const isOwner = question.author_id === user.id;

  return (
    <>
      <section className="bg-neutral-800/60 rounded-md p-4 mb-6 shadow-lg shadow-neutral-950">
        <h1 className="text-2xl text-green-500">{question.title}</h1>
        <p className="text-sm text-neutral-400">
          <Link to={`/u/${question.author.username}`} className="hover:underline">@{question.author.username}</Link> · {timeAgo(question.created_at)}
          {question.species && <> · <Link to={`/plants/${question.species.slug}`} className="hover:underline">{question.species.common_name}</Link></>}
        </p>
        {question.body && <p className="mt-3 whitespace-pre-line">{question.body}</p>}
      </section>

      <h2 className="text-xl mb-3">{answers.length} {answers.length === 1 ? "answer" : "answers"}</h2>
      {answers.map((a) => {
        const accepted = a.id === question.accepted_answer_id;
        return (
          <div key={a.id} className={`rounded-md p-4 mb-3 shadow-lg shadow-neutral-950 ${accepted ? "bg-green-900/40 border border-green-500" : "bg-neutral-800/60"}`}>
            <p className="whitespace-pre-line">{a.body}</p>
            <p className="text-sm text-neutral-400 mt-2">
              @{a.author.username} · {timeAgo(a.created_at)}
              {accepted && <span className="text-green-500"> · Accepted answer</span>}
            </p>
            {isOwner && !accepted && (
              <button type="button" onClick={() => accept(a.id)} className="text-green-500 text-sm underline mt-1">Accept this answer</button>
            )}
          </div>
        );
      })}

      <form onSubmit={submit} className="mt-4">
        <textarea
          aria-label="Your answer"
          placeholder="Write an answer…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          maxLength={2000}
          className="block w-full h-24 bg-neutral-900 rounded-md p-2 border border-green-900 focus:border-green-500 focus:outline-none"
        />
        <button type="submit" className="bg-green-500 text-neutral-800 px-3 pt-1 mt-2 rounded-sm hover:opacity-80">Post answer</button>
      </form>
    </>
  );
};

export default QuestionDetail;
