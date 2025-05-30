import { Link } from "react-router-dom";
import { useState } from "react";
import { UserCheck, LogIn, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from '../store/auth.store.js';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://example.com/authImagePattern.svg')] opacity-30 pointer-events-none"></div>

      <motion.div
        className="absolute w-24 h-24 rounded-full bg-primary/20 opacity-50"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-secondary/20 opacity-50"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "15%", right: "10%" }}
      />

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12">
        <div className="hidden md:block w-full md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="transform translate-x-[-20px] scale-110"
          >
            <img
              src="https://mistralaiblackforestprod.blob.core.windows.net/images/blackforest/fae1/6c4f/-df2/0-4ee9-9ba7-a13c4e690cc0/image.jpg"
              alt="Person saving documents"
              className="w-full max-w-lg mx-auto"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white/90 backdrop-blur border border-gray-200 rounded-xl shadow-md p-8 space-y-6 relative z-10"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <UserCheck className="mx-auto w-12 h-12 text-primary" />
            </motion.div>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
              Welcome to SaveUp
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-primary"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoggingIn}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-black hover:bg-primary/80 transition duration-300 font-medium shadow ${
                isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <LogIn className="w-5 h-5" />
              {isLoggingIn ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="text-sm text-center">
            <Link to="/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
