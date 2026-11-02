import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import Field from "./Field";

const Signup = ({ handleCloseClick, changeToLogin }) => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
      setError("Username must be 3-30 letters, numbers or underscores.");
      return;
    }
    setBusy(true);
    const { data, error: err } = await signUp(email, password, username);
    setBusy(false);
    if (err) {
      setError(err.message);
    } else if (data.session) {
      navigate("/feed");
    } else {
      toast.success("Check your email to confirm your account.");
      handleCloseClick(event);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCloseClick}
        aria-label="Close"
        className="absolute right-10 top-10 text-neutral-50 text-sm hover:bg-neutral-800 transition ease-in-out duration-300 w-10 h-10 align-middle rounded-full"
      >
        <span aria-hidden="true">&#10006;</span>
      </button>
      <div className="w-full md:w-96 text-left">
        <form onSubmit={handleSubmit}>
          <h2 className="text-neutral-50 text-lg mb-6 mt-1">Sign Up</h2>
          <Field label="Username" name="username" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          <Field label="Email" type="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Field label="Password" type="password" name="password" autoComplete="new-password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
          <p role="alert" className="text-red-500 text-sm min-h-[1.25rem]">{error}</p>
          <p className="text-sm mt-2 text-neutral-50">
            If you already have an account,
            <button type="button" onClick={changeToLogin} className="text-green-500 underline ml-1">
              Login
            </button>
          </p>
          <div className="my-8">
            <button
              type="submit"
              disabled={busy}
              className="bg-green-500 text-neutral-900 w-full h-8 hover:opacity-70 disabled:opacity-50 transition ease-in-out duration-300 rounded-sm"
            >
              {busy ? "Creating account…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
