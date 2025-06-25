import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { displayFriendsAtom, displayUploadMemoryAtom } from '../atoms/userDataAtom.js';
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Navigator() {

  const displayFriends = useSetRecoilState(displayFriendsAtom);
  const displayUploadMemory = useSetRecoilState(displayUploadMemoryAtom);

  return (
    <>
      <div className='flex sm:hidden justify-evenly bg-blue-500 p-3 fixed bottom-0 w-screen '>
        <NavLink to={"/feed"} className='flex flex-col justify-center items-center w-[20%]'>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ color: "white" }}>
            <path d="M8.99 23H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H8.99zM7.8 4.9l-2 1.5C4.15 7.638 3.61 8.074 3.317 8.658 3.025 9.242 3 9.937 3 12v4c0 1.442.002 2.424.101 3.159.095.706.262 1.033.485 1.255.223.223.55.39 1.256.485.734.099 1.716.1 3.158.1V14.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5V21c1.443 0 2.424-.002 3.159-.101.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.256.099-.734.101-1.716.101-3.158v-4c0-2.063-.025-2.758-.317-3.342-.291-.584-.832-1.02-2.483-2.258l-2-1.5c-1.174-.881-1.987-1.489-2.67-1.886C12.87 2.63 12.425 2.5 12 2.5c-.425 0-.87.13-1.53.514-.682.397-1.495 1.005-2.67 1.886zM14 21v-6.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21h4z"></path>
          </svg>
          <div className='text-[10px] text-white'>Home</div>
        </NavLink>
        <NavLink className='flex flex-col justify-center items-center w-[20%]' to={"gallery"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="white" fill="none">
            <path d="M6 17.9745C6.1287 19.2829 6.41956 20.1636 7.07691 20.8209C8.25596 22 10.1536 22 13.9489 22C17.7442 22 19.6419 22 20.8209 20.8209C22 19.6419 22 17.7442 22 13.9489C22 10.1536 22 8.25596 20.8209 7.07691C20.1636 6.41956 19.2829 6.1287 17.9745 6" stroke="white" strokeWidth="2"></path>
            <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2C13.7712 2 15.6569 2 16.8284 3.17157C18 4.34315 18 6.22876 18 10C18 13.7712 18 15.6569 16.8284 16.8284C15.6569 18 13.7712 18 10 18C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z" stroke="white" strokeWidth="2"></path>
            <path d="M2 11.1185C2.61902 11.0398 3.24484 11.001 3.87171 11.0023C6.52365 10.9533 9.11064 11.6763 11.1711 13.0424C13.082 14.3094 14.4247 16.053 15 18" stroke="white" strokeWidth="2" strokeLinejoin="round"></path>
            <path d="M12.9998 7H13.0088" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <div className='text-[10px] text-white'>Gallery</div>
        </NavLink>
        <NavLink className='flex flex-col justify-center items-center w-[20%]' to='/feed'>
          <IoIosAddCircleOutline className='text-white text-3xl' onClick={() => displayUploadMemory(pre => !pre)} />
          <div className='text-[10px] text-white'>Upload</div>
        </NavLink>
        <NavLink className='flex flex-col justify-center items-center w-[20%]' to={"messages"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="white" fill="none">
            <path d="M8.5 14.5H15.5M8.5 9.5H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z" stroke="white" strokeWidth="2" strokeLinejoin="round"></path>
          </svg>
          <div className='text-[10px] text-white'>Messages</div>
        </NavLink>
        <NavLink className='flex flex-col justify-center items-center w-[20%]' to='/feed'>
          <div onClick={() => displayFriends(pre => !pre)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="white" fill="none">
              <path d="M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M16 4C17.6568 4 19 5.34315 19 7C19 8.22309 18.268 9.27523 17.2183 9.7423" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M13.7143 14H10.2857C7.91876 14 5.99998 15.9188 5.99998 18.2857C5.99998 19.2325 6.76749 20 7.71426 20H16.2857C17.2325 20 18 19.2325 18 18.2857C18 15.9188 16.0812 14 13.7143 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M17.7143 13C20.0812 13 22 14.9188 22 17.2857C22 18.2325 21.2325 19 20.2857 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M8 4C6.34315 4 5 5.34315 5 7C5 8.22309 5.73193 9.27523 6.78168 9.7423" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3.71429 19C2.76751 19 2 18.2325 2 17.2857C2 14.9188 3.91878 13 6.28571 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <div className='text-[10px] text-white'>Friends</div>
        </NavLink>
      </div>
    </>
  )
}
