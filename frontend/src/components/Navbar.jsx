import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";
import { LogOut, PiggyBank, Settings, UserCheck, Bell, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`
        fixed top-0 w-full z-50
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-gray-200/80' 
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-md'
        }
      `}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group hover:scale-105 transition-all duration-300"
          >
            <div className="
              relative overflow-hidden
              bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600
              p-2.5 rounded-xl
              flex items-center justify-center
              shadow-lg shadow-blue-500/25
              group-hover:shadow-xl group-hover:shadow-blue-500/30
              transition-all duration-300
              before:absolute before:inset-0
              before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
              before:translate-x-[-100%] group-hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            ">
              <PiggyBank className="w-6 h-6 text-white relative z-10" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent select-none">
                SaveUp
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            
            {/* Search Button */}
            <button className="
              relative p-2.5 rounded-xl
              text-gray-600 hover:text-gray-900
              hover:bg-gray-100/80
              transition-all duration-300
              group
            ">
              <Search className="w-5 h-5" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300"></div>
            </button>

            {/* Notifications */}
            {authUser && (
              <button className="
                relative p-2.5 rounded-xl
                text-gray-600 hover:text-gray-900
                hover:bg-gray-100/80
                transition-all duration-300
                group
              ">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300"></div>
              </button>
            )}

            <Link
              to="/settings"
              className="
                relative flex items-center gap-2.5
                px-4 py-2.5 rounded-xl
                text-gray-700 hover:text-white
                bg-gradient-to-r from-gray-100 to-gray-50
                hover:from-blue-500 hover:to-indigo-600
                transition-all duration-300
                shadow-sm hover:shadow-lg hover:shadow-blue-500/25
                border border-gray-200/50 hover:border-transparent
                group overflow-hidden
              "
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              <span className="font-semibold">Settings</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10"></div>
            </Link>
            {authUser && (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                {/* User Avatar */}
                <div className="
                  relative w-10 h-10 rounded-full
                  bg-gradient-to-br from-blue-500 to-indigo-600
                  flex items-center justify-center
                  text-white font-bold text-sm
                  shadow-lg shadow-blue-500/25
                  cursor-pointer hover:shadow-xl hover:shadow-blue-500/30
                  transition-all duration-300
                  group
                ">
                  {authUser.username?.charAt(0).toUpperCase() || 'U'}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="
                    relative flex items-center gap-2.5
                    px-4 py-2.5 rounded-xl
                    text-gray-700 hover:text-white
                    bg-gradient-to-r from-gray-100 to-gray-50
                    hover:from-red-500 hover:to-red-600
                    transition-all duration-300
                    shadow-sm hover:shadow-lg hover:shadow-red-500/25
                    border border-gray-200/50 hover:border-transparent
                    group overflow-hidden
                  "
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  <span className="font-semibold">Logout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10"></div>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed top-16 right-0 w-80 max-w-[calc(100vw-2rem)]
        bg-white/95 backdrop-blur-xl
        border-l border-gray-200
        shadow-2xl shadow-gray-900/10
        transform transition-transform duration-300 ease-in-out
        z-50 md:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6 space-y-4">
          {/* Mobile User Info */}
          {authUser && (
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="
                w-12 h-12 rounded-full
                bg-gradient-to-br from-blue-500 to-indigo-600
                flex items-center justify-center
                text-white font-bold
                shadow-lg shadow-blue-500/25
              ">
                {authUser.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{authUser.username || 'User'}</p>
                <p className="text-sm text-gray-600">{authUser.email || 'user@example.com'}</p>
              </div>
            </div>
          )}

          {/* Mobile Navigation Items */}
          <div className="space-y-2">
            <button className="
              w-full flex items-center gap-3 p-4 rounded-xl
              text-gray-700 hover:text-gray-900
              hover:bg-gray-100/80
              transition-all duration-300
              text-left
            ">
              <Search className="w-5 h-5" />
              <span className="font-medium">Search</span>
            </button>

            {authUser && (
              <button className="
                w-full flex items-center justify-between p-4 rounded-xl
                text-gray-700 hover:text-gray-900
                hover:bg-gray-100/80
                transition-all duration-300
                text-left
              ">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Notifications</span>
                </div>
                {notifications > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
            )}

            <Link
              to="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                w-full flex items-center gap-3 p-4 rounded-xl
                text-gray-700 hover:text-white
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600
                transition-all duration-300
                text-left
              "
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>

            {authUser && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="
                  w-full flex items-center gap-3 p-4 rounded-xl
                  text-gray-700 hover:text-white
                  hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600
                  transition-all duration-300
                  text-left
                "
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;