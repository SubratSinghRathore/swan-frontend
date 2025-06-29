import React from "react";
import { FaComment, FaHeart, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

function timeAgo(isoDate) {
  return formatDistanceToNow(new Date(isoDate), { addSuffix: true });
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Post({
  description = "No description available.",
  post_url = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm90JTIwZm91bmR8ZW58MHx8MHx8fDA%3D",
  total_likes = 0,
  created_at = `${new Date().toISOString()}`,
}) {
  return (
    <div className="p-2 border-t border-gray-600">
      {/* User Info */}
      <div className="flex gap-4 items-center">
        <img
          className="w-10 aspect-square rounded-full"
          src="https://res.cloudinary.com/dfaweaiq5/image/upload/v1750360560/yfqhbnhzhao3cyeabr7s.jpg"
          alt="User"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Subrat</span>
          <span
            className="text-xs text-gray-400"
            title={formatDate(created_at)}
          >
            {timeAgo(created_at)}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div>
        <p className="py-2">{description}</p>
        <img className="w-full rounded-lg my-2" src={post_url} alt="Post" />

        {/* Action Bar */}
        <div className="flex justify-around px-4 py-2 border-t border-gray-300 text-gray-700 text-sm">
          <div className="flex flex-col items-center cursor-pointer hover:text-red-500 transition">
            <FaHeart size={20} />
            <span>{total_likes} Likes</span>
          </div>

          <div className="flex flex-col items-center cursor-pointer hover:text-blue-500 transition">
            <FaComment size={20} />
            <span>8 Comments</span>
          </div>

          <div className="flex flex-col items-center cursor-pointer hover:text-green-500 transition">
            <FaShare size={20} />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
