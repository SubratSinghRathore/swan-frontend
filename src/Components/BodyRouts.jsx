import React from 'react';
import SideMenu from './SideMenu.jsx';
import BodyInside from './BodyInside.jsx';

function BodyRouts() {
  return (
    <div className='home_body flex relative'>
        <SideMenu />
        <BodyInside />
      </div>
  )
}

export default BodyRouts