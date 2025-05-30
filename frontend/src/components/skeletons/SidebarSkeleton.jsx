import React from "react";
import { Users } from "lucide-react";

const DashboardSkeleton = () => {
  const skeletonLinks = Array(4).fill(null);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-gray-400" />
        <div className="skeleton h-6 w-32 rounded"></div>
      </div>

      <nav className="space-y-4">
        {skeletonLinks.map((_, idx) => (
          <div key={idx} className="skeleton h-4 w-48 rounded"></div>
        ))}
      </nav>

      <div className="mt-8 space-y-2">
        <div className="skeleton h-4 w-64 rounded"></div>
        <div className="skeleton h-4 w-40 rounded"></div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
