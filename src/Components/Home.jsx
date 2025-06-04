import React, { useEffect } from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../atoms/userDataAtom';
import Navigator from './Navigator.jsx'
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import SideMenu from './SideMenu.jsx';
import BodyInside from './BodyInside.jsx';

export default function Home() {

  return (
    <>

      <HomeWrapper />

    </>
  )
}

function HomeWrapper() {
  console.log("home wrapper")

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
  console.log("body")

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