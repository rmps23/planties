import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import Field from "./Field";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error: err } = await resetPassword(password, token);
    if (err) {
      setError(err.message);
    } else {
      toast.success("Password updated. You can log in now.");
      navigate("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-md p-10 w-full max-w-md text-neutral-50">
        <h1 className="text-lg mb-2">Choose a new password</h1>
        {!token && (
          <p role="alert" className="text-red-500 text-sm">
            This link is invalid or has expired.{" "}
            <Link to="/forgot-password" className="underline">Request a new one</Link>.
          </p>
        )}
        <Field label="New password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
        <p role="alert" className="text-red-500 text-sm">{error}</p>
        <button type="submit" disabled={!token} className="bg-green-500 text-neutral-900 w-full h-8 mt-4 rounded-sm hover:opacity-70 disabled:opacity-50 transition">
          Update password
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
