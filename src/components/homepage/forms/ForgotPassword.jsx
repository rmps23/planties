import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Field from "./Field";

const ForgotPassword = () => {
  const { sendReset } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const { error: err } = await sendReset(email);
    if (err) setError(err.message);
    else setMessage("If that email has an account, a reset link is on its way.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-md p-10 w-full max-w-md text-neutral-50">
        <h1 className="text-lg mb-2">Reset your password</h1>
        <Field label="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <p role="alert" className="text-red-500 text-sm">{error}</p>
        <p role="status" className="text-green-500 text-sm">{message}</p>
        <button type="submit" className="bg-green-500 text-neutral-900 w-full h-8 mt-4 rounded-sm hover:opacity-70 transition">
          Send reset link
        </button>
        <p className="text-sm mt-4"><Link to="/" className="text-green-500 underline">Back to Planties</Link></p>
      </form>
    </main>
  );
};

export default ForgotPassword;
