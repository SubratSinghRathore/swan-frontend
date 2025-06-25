import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiLogOut, FiCamera } from 'react-icons/fi';
import { displayFriendsAtom, displayProfileAtom, updateProfileAtom, userDataAtom } from '../atoms/userDataAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FaExchangeAlt, FaEnvelope, FaUsers, FaClock } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { replace, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios/axiosInstance';
import Loading from './Loading';
import { useState } from 'react';


const Profile = () => {

  const logoutRef = useRef(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [updateProfile, setUpdateProfile] = useRecoilState(updateProfileAtom);
  const setDisplayProfile = useSetRecoilState(displayProfileAtom);
  const displayFriends = useSetRecoilState(displayFriendsAtom)

  async function logout() {
    logoutRef.current.innerHTML = "Loging Out"
    const logout = await axiosInstance.post('/auth/logout');
    if (logout.status >= 200 && logout.status < 300) {
      window.location.href = '/';
    }

  }

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-6 profile_banner w-80 sm:w-100 overflow-scroll z-100 absolute right-2">
        <div className='flex flex-col justify-start items-end'>
          <IoClose onClick={() => setDisplayProfile(false)} className='text-gray-600 text-2xl ' />
        </div>
        <div className="flex flex-col items-center">
          <div className='relative group'>
            <ProfilePic />
            <FiCamera className="text-gray-700 w-16 h-15 absolute bottom-1 right-4.5 pt-7 hidden group-hover:block" onClick={() => setUpdateProfile(pre => !pre)} />
            <img
              src={userData.userData.user_profile_url}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
              loading='lazy'
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{userData.userData.user_name}</h2>
          <p className="text-gray-600">{userData.userData.user_email}</p>
        </div>

        <div className="sm:w-88 w-[100%] h-max  p-4 shadow-md flex flex-col gap-4">
          {/* Messages */}
          <Link to="/messages">
            <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
              <FaEnvelope className="text-blue-600 text-xl" />
              <span className="text-gray-800 font-medium">Messages</span>
            </div>
          </Link>

          {/* Friends */}
          <div onClick={() => displayFriends(pre => !pre)} className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
            <FaUsers className="text-blue-600 text-xl" />
            <span className="text-gray-800 font-medium">Friends</span>
          </div>

          {/* Memories */}
          <Link to="/gallery">
            <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
              <FaClock className="text-blue-600 text-xl" />
              <span className="text-gray-800 font-medium">Memories</span>
            </div>
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          <button onClick={() => navigate('/login', { replace: true })} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <FaExchangeAlt />
            Switch Account
          </button>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg border border-gray-500 hover:bg-gray-200 transition" ref={logoutRef} onClick={logout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  )
};



function ProfilePic() {

  const userData = useSetRecoilState(userDataAtom);
  const previousData = useRecoilValue(userDataAtom);

  const [loading, setLoading] = useState(false);

  function submitProfile(e) {
    const file = e.target.files?.[0];

    if (!file) {
      console.log("No file selected");
      return;
    }
    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        const response = await axiosInstance.post('/auth/update/profile',
          {
            type: "profile_pic",
            profile_pic: base64String
          },
          {}
        )
        userData({
          "userData": {
            "user_id": previousData.userData.user_id,
            "user_name": previousData.userData.user_name,
            "user_email": previousData.userData.user_email,
            "user_mobile_no": previousData.userData.user_mobile_no,
            "user_profile_url": response.data.user_profile_url
          }
        })
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('error in uploading profile pic', error);
      }
    };

    reader.readAsDataURL(file);
  }



  return (
    <>
      <div className='absolute top-0 flex gap-4 z-50' >
        {loading ? <div className="p-[44px] border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> : <input type='file' className='border border-r-gray-600 w-23 h-23 opacity-0 rounded-full' onChange={submitProfile} />}
      </div>
    </>
  )
}

export default Profile;
