import { NavLink } from "react-router-dom";

const SideLink = ({ title, icon, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full h-12 mb-2 flex items-center bg-neutral-800/60 rounded-md border-l-2 px-4 cursor-pointer hover:bg-neutral-700 ml-0 hover:translate-x-1 transition ease-in-out duration-300 hover:border-green-500 shadow-lg shadow-neutral-950 ${
          isActive ? "border-green-500" : "border-neutral-500"
        }`
      }
    >
      <div className="h-full flex items-center md:mr-4" aria-hidden="true">
        <span className="text-2xl text-green-500">{icon}</span>
      </div>
      <div className="h-7 hidden md:flex items-end">
        <p className="text-neutral-100 text-md">{title}</p>
      </div>
    </NavLink>
  );
};

export default SideLink;
