import React, { useState } from "react";
import { userDataAtom } from "../atoms/userDataAtom";
import { useRecoilState } from "recoil";

const Settings = () => {

  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [email, setEmail] = useState('');


  return (
    <div className="w-80 sm:w-100 overflow-scroll h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg notification_banner z-100 absolute right-2">
      <div className="px-4 py-2 flex justify-between">
        <h2 className="text-lg font-semibold text-blue-600">Settings</h2>
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
