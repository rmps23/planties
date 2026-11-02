import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Field from "./Field";

const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

const Login = ({ handleCloseClick }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async (mail, pw) => {
    setBusy(true);
    setError("");
    const { error: err } = await signIn(mail, pw);
    setBusy(false);
    if (err) setError(err.message);
    else navigate("/feed");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
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
          <h2 className="text-neutral-50 text-lg mb-6 mt-1">Login</h2>
          <Field label="Email" type="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Field label="Password" type="password" name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <p role="alert" className="text-red-500 text-sm min-h-[1.25rem]">{error}</p>
          <p className="text-sm text-neutral-50 mt-2">
            <Link to="/forgot-password" className="text-green-500 underline">Forgot your password?</Link>
          </p>
          <div className="my-6 space-y-3">
            <button
              type="submit"
              disabled={busy}
              className="bg-green-500 text-neutral-900 w-full h-8 hover:opacity-70 disabled:opacity-50 transition ease-in-out duration-300 rounded-sm"
            >
              {busy ? "Signing in…" : "Submit"}
            </button>
            {demoEmail && demoPassword && (
              <button
                type="button"
                disabled={busy}
                onClick={() => login(demoEmail, demoPassword)}
                className="border border-green-500 text-green-500 w-full h-8 hover:bg-green-500/10 transition ease-in-out duration-300 rounded-sm"
              >
                Try the demo account
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
