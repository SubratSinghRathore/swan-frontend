import React, { useEffect } from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../atoms/userDataAtom';
import Navigator from './Navigator.jsx'
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import SideMenu from './SideMenu.jsx';
import BodyInside from './BodyInside.jsx';
import { io } from 'socket.io-client';
import { axiosInstance } from '../../axios/axiosInstance.js';

export default function Home() {

  useEffect(() => {
    const socket = io('http://localhost:3000/', {
      withCredentials: true
    });
    
    
    return (() => socket.disconnect())
  }, [])

  return (
    <>

      <HomeWrapper />

    </>
  )
}

function HomeWrapper() {

  const userDetails = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userDetails) {
      navigate('/signup', { replace: true });
    }
  }, [userDetails, navigate]);

  return (
    <>
      <Header />
      <Body />
      <Navigator />


    </>
  );

}

function Body() {

  return (
    <>
      <div className='home_body flex relative'>
        <SideMenu />
        <BodyInside />
      </div>



      {/* Outlet for body to insert additinal components in home body */}
      <Outlet />
    </>
  )
}