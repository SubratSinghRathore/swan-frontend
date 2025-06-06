import React from 'react';
import { FiLock, FiLogOut, FiCamera } from 'react-icons/fi';
import { updateProfileAtom, userDataAtom } from '../atoms/userDataAtom';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { FaExchangeAlt, FaEnvelope, FaUsers, FaClock } from 'react-icons/fa';
import { replace, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios/axiosInstance';


const Profile = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [updateProfile, setUpdateProfile] = useRecoilState(updateProfileAtom);

  async function logout() {
    const logout = await axiosInstance.post('/auth/logout');
    if (logout.statusText == 'OK') {
      window.location.href = '/'
    }
  }

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-6 profile_banner w-80 sm:w-100 overflow-scroll h-[calc(100vh-120px)]">
        <div className="flex flex-col items-center">
          <div className='relative group'>
            <ProfilePic />
            <FiCamera className="text-gray-700 w-16 h-15 absolute bottom-1 right-4.5 pt-7 hidden group-hover:block" onClick={() => setUpdateProfile(pre => !pre)} />
            <img
              src={userData.userData.user_profile_url}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{userData.userData.user_name}</h2>
          <p className="text-gray-600">{userData.userData.user_email}</p>
        </div>

        <div className="w-88 h-max p-4 shadow-md flex flex-col gap-4">
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

        <div className="mt-6 space-y-3">
          <button onClick={() => navigate('login', { replace: true })} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <FaExchangeAlt />
            Switch Account
          </button>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg border border-gray-500 hover:bg-gray-200 transition" onClick={logout}>
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

  function submitProfile(e) {
    const file = e.target.files?.[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

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
            "user_id": 81,
            "user_name": "Subrat Singh",
            "user_email": "subratsingh777@gmail.com",
            "user_mobile_no": "1111111111",
            "user_profile_url": response.data.user_profile_url
          }
        })
      } catch (error) {
        console.log('error in uploading profile pic', error);
      }
    };

    reader.readAsDataURL(file); // 🟢 This triggers the reader
  }



  return (
    <>
      <div className='absolute top-0 flex gap-4 z-50' >
        <input type='file' className='border border-r-gray-600 w-23 h-23 opacity-0 rounded-full' onChange={submitProfile} />
      </div>
    </>
  )
}

export default Profile;
