import { useState } from "react";
import { UserCheck, Eye, EyeOff, Mail, Lock, Sparkles, Star } from "lucide-react";
import { useAuthStore } from "../store/auth.store";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 relative overflow-hidden font-sans">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/30 to-pink-500/30 blur-3xl animate-pulse delay-1000"></div>

      <Sparkles className="absolute top-10 right-10 text-blue-500 opacity-20 animate-bounce w-8 h-8" />
      <Star className="absolute bottom-10 left-10 text-purple-500 opacity-20 animate-bounce delay-500 w-6 h-6" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-12">
        <div className="hidden lg:block flex-1 relative">
          <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-3xl shadow-xl border border-white/20 hover:scale-105 transition-all duration-700 ease-out">
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 p-6 rounded-full shadow-xl">
                  <UserCheck className="w-16 h-16 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Join the Savings Revolution
              </h2>
              <p className="text-gray-700 font-medium max-w-md mx-auto">
                Empower your future with intuitive tools and powerful insights.
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                {["Secure", "Easy to Use", "Smart Goals"].map((f, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-gray-700 bg-white/50 backdrop-blur-sm border border-white/30 shadow hover:scale-105 transition duration-300"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="flex-1 max-w-md w-full relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8 space-y-8 transition-all duration-500 hover:shadow-3xl">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="relative group bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-4 rounded-full shadow-md hover:scale-110 transition">
                <UserCheck className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Welcome Back
            </h1>
            <p className="text-gray-600">Continue your financial journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${focusedField === "email" ? "text-blue-500" : "text-gray-400"}`} />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/40 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 shadow border border-transparent focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${focusedField === "password" ? "text-blue-500" : "text-gray-400"}`} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/40 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 shadow border border-transparent focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 hover:shadow-lg transition"
            >
              {isLoggingIn ? "Logging in..." : "Sign In"}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                alert("Forgot password clicked!");
              }}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
