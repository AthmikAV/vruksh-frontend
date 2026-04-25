import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Leaf, LogIn, LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { protectedNavigate } from "../utils/protectedNavigate";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setMenuOpen(false);
    navigate("/login");
  };

  const navLink = ({ isActive }) =>
    isActive
      ? "block text-green-700 bg-white font-semibold px-4 py-2 rounded-lg"
      : "block text-white/90 hover:bg-white/10 px-4 py-2 rounded-lg";

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-600 px-4 sm:px-6 lg:px-16 py-3 sticky top-0 z-50 shadow-md">
      
      {/* Top bar */}
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-white">
          <Leaf size={20} />
          <h1 className="font-bold text-lg">Vruksh</h1>
        </NavLink>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>

          {user && <NavLink to="/dashboard" className={navLink}>Dashboard</NavLink>}
          {user && <NavLink to="/profile" className={navLink}>Profile</NavLink>}

          <button
            onClick={() => protectedNavigate(navigate, user, "/donate")}
            className="ml-2 bg-white text-green-700 px-4 py-2 rounded-full font-semibold"
          >
            Donate
          </button>

          {user ? (
            <button onClick={handleLogout} className="text-white px-3 py-2">
              <LogOut size={16} />
            </button>
          ) : (
            <NavLink to="/login" className="text-white px-3 py-2">
              <LogIn size={16} />
            </NavLink>
          )}
        </div>

        {/* 🍔 Burger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 🍔 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-green-700 rounded-xl shadow-lg p-3 space-y-1">
          
          <NavLink to="/" className={navLink} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={navLink} onClick={() => setMenuOpen(false)}>About</NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className={navLink} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              <NavLink to="/profile" className={navLink} onClick={() => setMenuOpen(false)}>Profile</NavLink>
            </>
          )}

          {/* Donate */}
          <button
            onClick={() => {
              protectedNavigate(navigate, user, "/donate");
              setMenuOpen(false);
            }}
            className="w-full text-left  text-white font-semibold px-4 py-2 rounded-lg"
          >
            Donate
          </button>

          {/* Auth */}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-white px-4 py-2"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="block text-white px-4 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}