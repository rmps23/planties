import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="min-h-screen flex flex-col items-center justify-center text-neutral-100 gap-4">
    <h1 className="fancy text-4xl text-green-500">Page not found</h1>
    <Link to="/" className="underline hover:opacity-70">
      Back to Planties
    </Link>
  </main>
);

export default NotFound;
