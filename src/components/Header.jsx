import { NavLink } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-700 to-emerald-500 px-6 lg:px-16 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2">
        <div className="bg-white/20 p-1.5 rounded-lg">
          <Leaf size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-wide leading-none">
            Vruksh
          </h1>
          <p className="text-green-200 text-[10px] tracking-widest uppercase leading-none">
            Plant a tree · ₹400
          </p>
        </div>
      </NavLink>

      {/* Nav Links */}
      <div className="flex items-center gap-3 lg:gap-6">
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/profile", label: "Profile" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? "text-green-700 bg-white font-semibold text-sm px-4 py-1.5 rounded-[5px] shadow-md"
                : "text-white font-medium text-sm px-4 py-1.5 rounded-[5px] hover:bg-white/20 transition-all duration-200"
            }
          >
            {label}
          </NavLink>
        ))}

        {/* CTA Button */}
        <NavLink
          to="/donate"
          className="ml-2 bg-white text-green-700 font-bold text-sm px-5 py-2 rounded-full shadow-md hover:bg-green-50 transition-all duration-200 flex items-center gap-1.5"
        >
          <Leaf size={14} />
          Donate Now
        </NavLink>
      </div>
    </nav>
  );
}