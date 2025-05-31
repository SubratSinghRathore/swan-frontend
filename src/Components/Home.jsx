import React, { useEffect } from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { userDataAtom, displaySettingsAtom, displayProfileAtom, displayNotificationAtom } from '../atoms/userDataAtom';
import Navigator from './Navigator.jsx'
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Signup from './Authantication/Signup.jsx';
import SideMenu from './SideMenu.jsx';
import Settings from './Settings.jsx';
import Profile from './Profile.jsx';
import Notification from './Notification.jsx';

export default function Home() {

  return (
    <>
      <RecoilRoot>
        <HomeWrapper />
      </RecoilRoot>
    </>
  )
}

function HomeWrapper() {

  const userDetails = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  if (!userDetails) {
    // navigate('/signup', { replace: true })
    return (<Signup />)
  } else {
    return (
      <>
        <Header />
        <Body />
        <Navigator />
      </>
    )
  }

}

function Body() {

  const displaySettings = useRecoilValue(displaySettingsAtom);
  const displayProfile = useRecoilValue(displayProfileAtom);
  const displayNotification = useRecoilValue(displayNotificationAtom);


  return (
    <>
      <div className='home_body'>
      <SideMenu />

        {displaySettings && <Settings />}

        {displayProfile && <Profile />}

        {displayNotification && <Notification />}
      </div>



      {/* Outlet for body to insert additinal components in home body */}
      <Outlet />
    </>
  )
}