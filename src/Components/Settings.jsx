import React from "react";

const settings = [
  {
    id: 1,
    name: "वित्तू यादव",
    message: "commented on his post that you haven't seen.",
    time: "1w",
    avatar: "/avatars/vittu1.jpg",
  },
  {
    id: 2,
    name: "Aditya Kushwaha",
    message: "commented on Shreya Dwivedi's post.",
    time: "1w",
    avatar: "/avatars/aditya.jpg",
  },
  {
    id: 3,
    name: "वित्तू यादव",
    message: "commented on his post that you haven't seen.",
    time: "2w",
    avatar: "/avatars/vittu2.jpg",
  },
  {
    id: 4,
    name: "Rajat Kushwaha",
    message: "commented on Deepak Yadav's post.",
    time: "2w",
    avatar: "/avatars/rajat.jpg",
  },
  {
    id: 5,
    name: "Himanshu Gupta",
    message: "added a new photo.",
    time: "2w",
    avatar: "/avatars/himanshu.jpg",
  },
  {
    id: 6,
    name: "Alina Jain",
    message: "You have a new friend suggestion:",
    time: "2w",
    avatar: "/avatars/alina.jpg",
  },
];

const Settings = () => {
  return (
    <div className="w-80 sm:w-100 overflow-scroll h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg notification_banner">
      <div className="px-4 py-2 border-b flex justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <div className="flex gap-2">
          <button className="text-blue-600 font-medium hover:underline">All</button>
          <button className="text-gray-500 hover:text-blue-600 hover:underline">Unread</button>
        </div>
      </div>
      <div className="divide-y">
        {settings.map((notif) => (
          <div key={notif.id} className="flex items-start px-4 py-3 hover:bg-gray-100">
            <img src={notif.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover mr-3" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{notif.name}</span> {notif.message}
              </p>
              <span className="text-xs text-gray-500">{notif.time}</span>
            </div>
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 ml-2"></div>
          </div>
        ))}
      </div>
      <div className="text-center border-t px-4 py-2">
        <button className="text-blue-600 font-medium hover:underline">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Settings;
