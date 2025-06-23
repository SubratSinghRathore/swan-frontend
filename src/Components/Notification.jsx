import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { displayNotificationAtom, userDataAtom } from "../atoms/userDataAtom";
import { axiosInstance } from "../../axios/axiosInstance";

const Notifications = () => {

  const userData = useRecoilValue(userDataAtom);
  const displayNotification = useSetRecoilState(displayNotificationAtom);
  const [notifications, setNotifications] = useState([]);
  const userDetails = useRef(null);

  useEffect(() => {
    (async function () {
      const getNotifications = await axiosInstance.get('/message/notification', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      setNotifications(getNotifications.data.notifications);
    })();
  }, []);

  //sender information
  function SenderInfo({ sender_id }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchSenderInfo = async () => {
      try {
        const res = await axiosInstance.post('/feed/post/origin', {
          origin: sender_id
        }, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });

        setUserDetails(res.data.originDetails[0]);
      } catch (error) {
        console.error("Failed to load sender info", error);
      }
    };

    fetchSenderInfo();
  }, [sender_id]);

  if (!userDetails) {
    return (
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
    ); // optional loading UI
  }

  return (
    <div className="flex flex-col justify-center items-center w-10">
      <img src={userDetails.user_profile_url} alt="avatar" className="w-10 rounded-full" />
      <span className="text-xs truncate h-5 w-10">{userDetails.user_name}</span>
    </div>
  );
}

function clearNotification(user_id) {
  try {
    axiosInstance.delete('/message/clear-notification', {
      params: {receiver_id: user_id},
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  } catch (error) {
    
  }
}

  return (
    <div className="w-80 sm:w-100 overflow-scroll sm:h-[calc(100vh-120px)] h-[calc(100vh-210px)] bg-white rounded-lg shadow-lg notification_banner z-100 absolute right-2">
      <div className="px-4 py-2 border-b flex justify-between">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex gap-2">
          <button onClick={() => {setNotifications([]); clearNotification(userData.userData.user_id)}} className="text-blue-600 font-medium hover:underline">Clear</button>
          <IoClose onClick={() => displayNotification(false)} className='text-gray-600 text-3xl pt-1' />
        </div>
      </div>
      <div className="divide-y">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex items-start px-4 py-3 hover:bg-gray-100">
            <SenderInfo sender_id={notif.sender_id} />
            <div className="flex-1 ml-3">
              <p className="text-sm">
                <span className="font-medium">{notif.notification_description}</span>
              </p>
              <span className="text-xs text-gray-500">{new Date(notif.create_at).toLocaleTimeString()}</span>
            </div>
            {/* <IoClose className="text-xl text-gray-400 rounded-full m-auto" /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
