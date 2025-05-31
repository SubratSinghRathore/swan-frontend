import React, { useEffect } from 'react'
import { RecoilRoot, useRecoilValue } from 'recoil';
import { userDataAtom } from './atoms/userDataAtom';
import { Outlet } from 'react-router-dom';


export default function App() {

  return (
    <>
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </>
  )
}