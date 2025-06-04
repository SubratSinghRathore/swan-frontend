import React from 'react';
import { FaUser, FaEnvelope, FaUsers, FaClock } from 'react-icons/fa';

export default function Sidebar() {console.log("sidebar")
  return (
    <div className="w-60 h-[calc(100vh-70px)] bg-gray-100 p-4 shadow-md hidden flex-col gap-4 sm:flex">
      {/* Profile */}
      <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
        <FaUser className="text-blue-600 text-xl" />
        <span className="text-gray-800 font-medium">Profile</span>
      </div>

      {/* Messages */}
      <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
        <FaEnvelope className="text-blue-600 text-xl" />
        <span className="text-gray-800 font-medium">Messages</span>
      </div>

      {/* Friends */}
      <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
        <FaUsers className="text-blue-600 text-xl" />
        <span className="text-gray-800 font-medium">Friends</span>
      </div>

      {/* Memories */}
      <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
        <FaClock className="text-blue-600 text-xl" />
        <span className="text-gray-800 font-medium">Memories</span>
      </div>
    </div>
  );
}
