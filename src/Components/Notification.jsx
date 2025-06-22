import React from "react";
import { IoClose } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { displayNotificationAtom } from "../atoms/userDataAtom";

const notifications = [];

const Notifications = () => {

  const displayNotification = useSetRecoilState(displayNotificationAtom);

  return (
    <div className="w-80 sm:w-100 overflow-scroll sm:h-[calc(100vh-120px)] h-[calc(100vh-160px)] bg-white rounded-lg shadow-lg notification_banner z-100 absolute right-2">
      <div className="px-4 py-2 border-b flex justify-between">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex gap-2">
          <button className="text-blue-600 font-medium hover:underline">Clear</button>
          <IoClose onClick={() => displayNotification(false)} className='text-gray-600 text-2xl pt-1'/>
        </div>
      </div>
      <div className="divide-y">
        {notifications.map((notif) => (
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
    </div>
  );
};

export default Notifications;
