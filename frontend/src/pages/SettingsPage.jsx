import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Settings, Bell, User, Lock } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";
const SettingsPage = () => {

  const {authUser} = useAuthStore();
  const [username, setUsername] = useState("Imanizibyose Chadrack");
  const [email, setEmail] = useState("imanizibyosechadrack@gmail.com");
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error('You must be logged in to Chnage the data')
      return;
    }
    console.log("Settings saved:", { username, email, notifications });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary/20 p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl shadow-xl p-8 max-w-md w-full space-y-6"
      >
        <div className="flex flex-col items-center text-center space-y-2">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Settings className="w-12 h-12 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">Manage your account preferences below</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              <User className="inline w-4 h-4 mr-1 text-primary" />
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!authUser}
              className={`w-full px-4 py-2 rounded-md border border-gray-300 transition ${
                authUser
                  ? "focus:outline-none focus:ring-2 focus:ring-primary"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <User className="inline w-4 h-4 mr-1 text-primary" />
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!authUser}
              className={`w-full px-4 py-2 rounded-md border border-gray-300 transition ${
                authUser
                  ? "focus:outline-none focus:ring-2 focus:ring-primary"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <label htmlFor="notifications" className="flex items-center text-sm font-medium text-gray-700">
              <Bell className="w-4 h-4 mr-1 text-primary" />
              Enable Notifications
            </label>
            <input
              id="notifications"
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              disabled={!authUser}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
            />
          </div>

          <motion.button
            whileHover={{ scale: authUser ? 1.03 : 1 }}
            whileTap={{ scale: authUser ? 0.97 : 1 }}
            type="submit"
            disabled={!authUser}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md transition duration-300 font-medium shadow ${
              authUser
                ? "bg-primary text-black hover:bg-primary/80"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {authUser ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Login to Edit
              </>
            )}
          </motion.button>

          {!authUser && (
            <p className="text-center text-xs text-red-500">⚠️ You must be logged in to change settings.</p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
