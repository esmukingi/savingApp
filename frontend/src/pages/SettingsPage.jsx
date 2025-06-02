import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Settings, User, Shield, Palette, Globe, Smartphone, Edit3, Key, Database, Lock, AlertCircle, CheckCircle, Sun, Moon } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const { authUser, changePassword, isPasswordChanging } = useAuthStore();

  const [profileData, setProfileData] = useState({
    username: "Imanizibyose Chadrack",
    email: "imanizibyosechadrack@gmail.com",
    phone: "+250 789 506 049",
    bio: "A self entrepreneur and patron at Apeki Tumba Tss.",
    location: "Kigali, Rwanda",
    website: "https://chadrack.info"
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordChanged: "2024-01-15",
    loginAlerts: true,
    dataEncryption: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    language: "en",
    timezone: "Africa/Kigali",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data & Privacy", icon: Database }
  ];

  const handleSave = async (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error('You must be logged in to change the data');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Settings saved successfully!');
    setIsLoading(false);
  };

  const handlePasswordChange = async () => {
    if (!authUser) {
      toast.error('You must be logged in to change the password');
      return;
    }
    if (!newPassword) {
      toast.error('Please enter a new password');
      return;
    }
    changePassword(newPassword);
  };

  const TabButton = ({ tab, isActive, onClick }) => {
    const IconComponent = tab.icon;
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`
          relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
          ${isActive
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }
        `}
      >
        <IconComponent className="w-5 h-5" />
        <span className="font-medium hidden md:inline">{tab.label}</span>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl -z-10"
          />
        )}
      </motion.button>
    );
  };

  const ProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2 text-blue-500" />
            Full Name
          </label>
          <input
            type="text"
            value={profileData.username}
            onChange={(e) => setProfileData({...profileData, username: e.target.value})}
            disabled={!authUser}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Smartphone className="inline w-4 h-4 mr-2 text-blue-500" />
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            disabled={!authUser}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Globe className="inline w-4 h-4 mr-2 text-blue-500" />
            Location
          </label>
          <input
            type="text"
            value={profileData.location}
            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
            disabled={!authUser}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-100"
          />
        </div>
      </div>
    </motion.div>
  );

  const SecuritySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-blue-500" />
          Password & Authentication
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-500">Last changed: {securitySettings.passwordChanged}</p>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-gray-50 rounded-lg gap-2">
            <p className="font-medium text-gray-900">New Password</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePasswordChange}
            disabled={!authUser || isPasswordChanging}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg
              ${authUser && !isPasswordChanging
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-xl hover:from-blue-600 hover:to-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isPasswordChanging ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Changing Password...
              </>
            ) : (
              <>
                <Key className="w-5 h-5" />
                Change Password
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const AppearanceSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-500" />
          Theme Preferences
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {[
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
          ].map((theme) => (
            <button
              key={theme.value}
              onClick={() => setAppearanceSettings({...appearanceSettings, theme: theme.value})}
              className={`p-4 rounded-xl border-2 transition-all ${
                appearanceSettings.theme === theme.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <theme.icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium">{theme.label}</p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const DataSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-500" />
          Data Management
        </h3>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Delete Account</p>
                <p className="text-sm text-gray-500">Permanently delete your account</p>
              </div>
            </div>
            <Lock className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return <ProfileSection />;
      case "security": return <SecuritySection />;
      case "appearance": return <AppearanceSection />;
      case "data": return <DataSection />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
        <Settings className="w-6 h-6 text-blue-500" />
        Settings
      </div>

      <div className="flex flex-wrap gap-2 md:gap-4">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className={`
            w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg
            ${!isLoading
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-xl hover:from-blue-600 hover:to-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default SettingsPage;
