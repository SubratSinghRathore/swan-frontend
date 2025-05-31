import React from 'react';
import { FaUser, FaEnvelope, FaUsers, FaClock } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-100 p-4 shadow-md flex flex-col gap-4">
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
