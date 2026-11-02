import { Link, useNavigate } from "react-router-dom";
import { RiLeafFill, RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth } from "../../../../context/AuthContext";

const TopNavbar = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="w-full h-16 bg-neutral-900 shadow-sm shadow-green-600/60 fixed z-10 bg-opacity-50 backdrop-filter backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full p-4">
        <div className="w-full flex justify-between items-center h-full">
          <Link to="/feed" className="fancy text-2xl text-green-500 flex">
            Planties <RiLeafFill className="text-2xl text-green-500" aria-hidden="true" />
          </Link>
          <div className="flex items-center gap-3">
            {profile && <span className="text-sm text-neutral-300 hidden sm:inline">@{profile.username}</span>}
            <button
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
              className="text-neutral-50 bg-neutral-800 w-8 h-8 p-2 rounded-full hover:opacity-90 transition ease-in-out duration-300"
            >
              <RiLogoutBoxRLine className="w-full h-full" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
