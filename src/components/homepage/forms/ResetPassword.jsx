import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import Field from "./Field";

const ResetPassword = () => {
  const { updatePassword, user, loading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error: err } = await updatePassword(password);
    if (err) {
      setError(err.message);
    } else {
      toast.success("Password updated.");
      navigate("/feed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-md p-10 w-full max-w-md text-neutral-50">
        <h1 className="text-lg mb-2">Choose a new password</h1>
        {!loading && !user && (
          <p role="alert" className="text-red-500 text-sm">
            This link is invalid or has expired. Request a new one from the login form.
          </p>
        )}
        <Field label="New password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
        <p role="alert" className="text-red-500 text-sm">{error}</p>
        <button type="submit" disabled={!user} className="bg-green-500 text-neutral-900 w-full h-8 mt-4 rounded-sm hover:opacity-70 disabled:opacity-50 transition">
          Update password
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
