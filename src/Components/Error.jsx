import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';

function Error() {

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/feed', { replace: true });
    }, []);

  return (
    <div>
        <Loading />
    </div>
  )
}

export default Error;