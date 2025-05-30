import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";
import { LogOut, PiggyBank, Settings, UserCheck } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="
      fixed top-0 w-full z-50
      bg-white/70 backdrop-blur-md
      border-b border-gray-200
      shadow-md
      "
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 h-16 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300">
          <div className="
            bg-primary/20 
            p-2 rounded-lg 
            flex items-center justify-center
            shadow-sm
            "
          >
            <PiggyBank className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-primary select-none">SaveUp</h1>
        </Link>

        {/* Right side navigation */}
        <nav className="flex items-center gap-4 sm:gap-6">

          {/* Settings Button */}
          <Link
            to="/settings"
            className="
              btn btn-sm px-3 py-1.5
              flex items-center gap-2
              rounded-md
              text-gray-700
              hover:bg-primary hover:text-black
              transition
              duration-300
              shadow-sm
            "
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Settings</span>
          </Link>

          {/* Authenticated User Buttons */}
          {authUser && (
            <>
              <button
                onClick={logout}
                className="
                  btn btn-sm px-3 py-1.5
                  flex items-center gap-2
                  rounded-md
                  text-gray-700
                  hover:bg-red-600 hover:text-white
                  transition
                  duration-300
                  shadow-sm
                "
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
