import React, { useState } from "react";
import { displaySettingsAtom, userDataAtom } from "../atoms/userDataAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IoClose } from "react-icons/io5";

const Settings = () => {

  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [email, setEmail] = useState('');
  const setdisplaySetting = useSetRecoilState(displaySettingsAtom)

  return (
    <div className="w-80 sm:w-100 overflow-scroll sm:h-[calc(100vh-120px)] h-[calc(100vh-210px)] bg-white rounded-lg shadow-lg notification_banner z-100 absolute right-2">
      <div className="px-4 py-2 flex justify-between">
        <h2 className="text-lg font-semibold text-blue-600">Settings</h2>
          <IoClose onClick={() => setdisplaySetting(false)} className='text-gray-600 text-2xl' />
      </div>
      <div className="m-4">
          <label className="block mb-1 text-[12px]">Change Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={userData.userData.user_email}
          />
        </div>
    </div>
  );
};

export default Settings;
