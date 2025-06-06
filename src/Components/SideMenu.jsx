import React from 'react';
import { FaUser, FaEnvelope, FaUsers, FaClock } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { displayProfileAtom, displayUploadMemoryAtom } from '../atoms/userDataAtom';
import { useSetRecoilState } from 'recoil';

export default function Sidebar() {

  const displayProfile = useSetRecoilState(displayProfileAtom);
  const displayUploadMemory = useSetRecoilState(displayUploadMemoryAtom);

  return (
    <>
      <div className="w-60 h-[calc(100vh-70px)] bg-gray-100 p-4 shadow-md hidden flex-col gap-4 sm:flex justify-between">
        <div className='flex gap-4 flex-col'>
          {/* Profile */}
          <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded cursor-pointer">
            <FaUser className="text-blue-600 text-xl" />
            <span className="text-gray-800 font-medium" onClick={() => displayProfile(pre => !pre)}>Profile</span>
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
        <div>
          <label className="flex items-center gap-2 cursor-pointer text-white bg-blue-600 justify-center p-4 rounded-2xl hover:bg-blue-700">
            <FiUpload className="text-2xl" />
            <span className='text-2xl' onClick={() => displayUploadMemory(pre => !pre)}>Upload</span>
          </label>
        </div>
      </div>
    </>
  );
}
