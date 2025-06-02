import React from "react";

const SidebarSkeleton = () => {
  return (
    <aside className="
      fixed top-16 left-0
      w-20 md:w-64
      h-[calc(100vh-4rem)] 
      bg-gradient-to-b from-white to-gray-50
      border-r border-gray-200
      flex flex-col
      z-30
      overflow-hidden
      shadow-lg
      animate-pulse
    ">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
        <div className="bg-gray-200 rounded-lg w-9 h-9" />
        <div className="hidden md:block bg-gray-200 h-5 w-32 rounded" />
      </div>

      {/* Categories Title Skeleton */}
      <div className="px-5 py-3 hidden md:block">
        <div className="bg-gray-200 h-3 w-24 rounded" />
      </div>

      {/* Categories List Skeleton */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-2">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between px-3 py-3 rounded-lg mx-2"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 rounded-full w-8 h-8" />
              <div className="hidden md:block bg-gray-200 h-4 w-24 rounded" />
            </div>
            <div className="hidden md:block bg-gray-200 w-4 h-4 rounded-full" />
          </div>
        ))}
      </nav>

      {/* Footer Skeleton */}
      <div className="p-4 border-t border-gray-200 bg-white/80">
        <div className="hidden md:block bg-gray-200 h-3 w-20 mx-auto rounded" />
      </div>
    </aside>
  );
};

export default SidebarSkeleton;