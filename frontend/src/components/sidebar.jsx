// src/components/Sidebar.jsx
import { useEffect, useState } from "react";
import { useSidebarStore } from "../store/sidebarStore";
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  ChevronRight, 
  Menu,
  X,
  Home,
  Settings,
  User,
  Bell,
  Bookmark,
  TrendingUp,
  Calendar,
  FileText,
  Database,
  BarChart3,
  Layers,
  Tag,
  Folder,
  Star,
  Activity
} from "lucide-react";

// Category icon mapping for better visual representation
const categoryIcons = {
  dashboard: Home,
  analytics: BarChart3,
  reports: FileText,
  settings: Settings,
  profile: User,
  notifications: Bell,
  bookmarks: Bookmark,
  trending: TrendingUp,
  calendar: Calendar,
  database: Database,
  layers: Layers,
  tags: Tag,
  folders: Folder,
  favorites: Star,
  activity: Activity,
};

// Function to get appropriate icon for category
const getCategoryIcon = (categoryName) => {
  const key = categoryName.toLowerCase();
  return categoryIcons[key] || Folder;
};

const Sidebar = () => {
  const { categories, isLoading, fetchCategories } = useSidebarStore();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Auto-collapse on mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside className={`
        fixed top-16 left-0
        ${isCollapsed ? 'w-16' : 'w-20 md:w-72'}
        h-[calc(100vh-4rem)]
        bg-white/95 backdrop-blur-xl
        border-r border-gray-200/80
        flex flex-col
        z-50
        transition-all duration-300 ease-in-out
        shadow-xl shadow-gray-900/5
        ${!isCollapsed ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="
              bg-gradient-to-br from-blue-600 to-indigo-600 
              p-2.5 rounded-xl 
              flex items-center justify-center
              shadow-lg shadow-blue-500/25
              transform transition-transform hover:scale-105
            ">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="hidden md:block">
                <span className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Dashboard
                </span>
                <p className="text-xs text-gray-500 font-medium">Menu</p>
              </div>
            )}
          </div>
          
          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="
              p-2 rounded-lg
              text-gray-400 hover:text-gray-600
              hover:bg-gray-100
              transition-all duration-200
              hidden md:flex items-center justify-center
            "
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>

        {/* Categories List */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {!isCollapsed && (
            <div className="px-3 mb-4 hidden md:block">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                Categories
              </h3>
            </div>
          )}
          
          {categories.length === 0 ? (
            <div className="text-center text-gray-400 py-8 text-sm">
              <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
              {!isCollapsed && "No categories available"}
            </div>
          ) : (
            <div className="space-y-1">
              {categories.map((category, index) => {
                const isActive = location.pathname === category.link;
                const IconComponent = getCategoryIcon(category.category);
                
                return (
                  <div
                    key={category._id}
                    className="relative group"
                    onMouseEnter={() => setHoveredCategory(category._id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: 'slideInLeft 0.3s ease-out forwards'
                    }}
                  >
                    <Link
                      to={category.link}
                      className={`
                        relative flex items-center gap-4
                        px-4 py-3.5 rounded-xl
                        transition-all duration-300 ease-out
                        transform hover:translate-x-1
                        ${isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                          : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900"
                        }
                        ${hoveredCategory === category._id ? 'shadow-md' : ''}
                      `}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                      )}
                      
                      {/* Icon */}
                      <div className={`
                        flex-shrink-0 flex items-center justify-center
                        w-10 h-10 rounded-lg
                        transition-all duration-300
                        ${isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                        }
                      `}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      {/* Category name */}
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-sm truncate block">
                            {category.category}
                          </span>
                          <span className="text-xs opacity-75 truncate block">
                            {category.description || `${category.category} section`}
                          </span>
                        </div>
                      )}
                      
                      {/* Arrow */}
                      {!isCollapsed && (
                        <ChevronRight className={`
                          w-4 h-4 transition-all duration-300
                          ${isActive ? "text-white transform rotate-90" : "text-gray-400 group-hover:text-blue-500"}
                          ${hoveredCategory === category._id ? 'transform translate-x-1' : ''}
                        `} />
                      )}
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="
                        absolute left-full top-1/2 -translate-y-1/2 ml-2
                        px-3 py-2 rounded-lg
                        bg-gray-900 text-white text-sm font-medium
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-200
                        whitespace-nowrap z-50
                        shadow-lg
                      ">
                        {category.category}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50">
          {!isCollapsed ? (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-600 font-medium">Online</span>
              </div>
              <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} Chadrack Saving
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          )}
        </div>
      </aside>
      
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;