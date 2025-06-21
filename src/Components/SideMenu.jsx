import React from 'react';
import { FaUser, FaEnvelope, FaUsers, FaClock, FaSearch  } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { displayProfileAtom, displayUploadMemoryAtom, displayFriendsAtom, displaySearchAtom } from '../atoms/userDataAtom';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

export default function Sidebar() {

  const displayProfile = useSetRecoilState(displayProfileAtom);
  const displayUploadMemory = useSetRecoilState(displayUploadMemoryAtom);
  const displayFriends = useSetRecoilState(displayFriendsAtom);
  const displaySearch = useSetRecoilState(displaySearchAtom);

  return (
    <>
      <div className="w-60 h-[calc(100vh-70px)] bg-gray-100 p-4 shadow-md hidden flex-col gap-4 sm:flex justify-between">
        <div className='flex gap-4 flex-col'>
          {/* Search */}
          <div onClick={() => displaySearch(pre => !pre)} className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
            <FaSearch  className="text-blue-600 text-xl" />
            <span className="text-gray-800 font-medium">Search</span>
          </div>

          {/* Profile */}
          <div onClick={() => displayProfile(pre => !pre)} className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
            <FaUser className="text-blue-600 text-xl" />
            <span className="text-gray-800 font-medium">Profile</span>
          </div>

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
          <Link to='/gallery'>
            <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
              <FaClock className="text-blue-600 text-xl" />
              <span className="text-gray-800 font-medium">Memories</span>
            </div>
          </Link>
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer text-white bg-blue-600 justify-center p-4 rounded-2xl hover:bg-blue-700" onClick={() => displayUploadMemory(pre => !pre)}>
            <FiUpload className="text-2xl" />
            <span className='text-2xl'>Upload</span>
          </label>
        </div>
      </div>
    </>
  );
}
