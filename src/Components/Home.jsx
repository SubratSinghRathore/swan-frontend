import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../atoms/userDataAtom';
import Navigator from './Navigator.jsx'
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './Header.jsx';

export default function Home() {

  const userDetails = useRecoilValue(userDataAtom);
  const navigate = useNavigate();

  if(!userDetails) {window.location = '/signup'}
  else {window.location = '/feed'}

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
      {/* Outlet for body to insert additinal components in home body */}
      <Outlet />
    </>
  )
}