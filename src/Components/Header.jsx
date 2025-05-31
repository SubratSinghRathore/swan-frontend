import React from 'react'
import { Link } from 'react-router-dom'
import logoText from '../assets/svg logo.svg'
import { displayNotificationAtom, displayProfileAtom, displaySettingsAtom, userDataAtom } from '../atoms/userDataAtom.js';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import SideMenu from './SideMenu.jsx';

function Header() {



  return (
    <>
      
        <div className='flex flex-row justify-between shadow-xl/10 border-0'>
          <Link to='/'>
            <img className='w-24 pl-4' src={logoText} alt="" />
          </Link>
          <div className='flex flex-row align-middle justify-center items-center gap-2'>
            <Setting />
            <Notification />
            <Profile />
          </div>
        </div>
      
    </>
  )
}

function Setting() {

  const displaySettings = useSetRecoilState(displaySettingsAtom);

  return (
    <>
      <div className=' w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center' onClick={() => displaySettings(pre => !pre)}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <path d="M15.5 11.5C15.5 13.433 13.933 15 12 15C10.067 15 8.5 13.433 8.5 11.5C8.5 9.567 10.067 8 12 8C13.933 8 15.5 9.567 15.5 11.5Z" stroke="#000000" strokeWidth="2"></path>
            <path d="M21 13.5995C21.3155 13.5134 21.6503 13.4669 22 13.4669V9.53324C19.1433 9.53324 17.2857 6.43041 18.732 3.96691L15.2679 2.0001C13.8038 4.49405 10.1978 4.49395 8.73363 2L5.26953 3.96681C6.71586 6.43035 4.85673 9.53324 2 9.53324V13.4669C4.85668 13.4669 6.71425 16.5697 5.26795 19.0332L8.73205 21C9.46434 19.7527 10.7321 19.1289 12 19.1286" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M18.5 15L18.7579 15.697C19.0961 16.611 19.2652 17.068 19.5986 17.4014C19.932 17.7348 20.389 17.9039 21.303 18.2421L22 18.5L21.303 18.7579C20.389 19.0961 19.932 19.2652 19.5986 19.5986C19.2652 19.932 19.0961 20.389 18.7579 21.303L18.5 22L18.2421 21.303C17.9039 20.389 17.7348 19.932 17.4014 19.5986C17.068 19.2652 16.611 19.0961 15.697 18.7579L15 18.5L15.697 18.2421C16.611 17.9039 17.068 17.7348 17.4014 17.4014C17.7348 17.068 17.9039 16.611 18.2421 15.697L18.5 15Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
    </>
  )
}

function Notification() {

  const displayNotification = useSetRecoilState(displayNotificationAtom);

  return (
    <>
      <div className=' w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center content-center' onClick={() => displayNotification(pre => !pre)}>
        <div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" style={{ color: "black" }}><path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path></svg>
        </div>
      </div>
    </>
  )
}

function Profile() {

  const userDetails = useRecoilValue(userDataAtom);
  const displayProfile = useSetRecoilState(displayProfileAtom);

  if (userDetails) {
    return (
      <>
        <div className='relative ' onClick={() => displayProfile(pre => !pre)}>
          <img className='w-12 h-12 rounded-full mr-3 z-0' src={userDetails.userData.user_profile_url} alt="profile picture" />
          <div className='absolute bottom-0 right-2 z-10'>
            <div className="bg-gray-200 rounded-full shadow-xl/15 border-0">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ color: "gray" }}><g fill-rule="evenodd" transform="translate(-448 -544)"><path fill-rule="nonzero" d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"></path></g></svg>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Header