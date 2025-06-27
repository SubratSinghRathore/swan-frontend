import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axios/axiosInstance'

function FriendInfo({friend_id}) {

    const [friendDetails, setFriendDetails] = useState([])

    useEffect(() => {
        try {
            const friendDetailsFunction = async () => {
                const friendDetails = await axiosInstance.post('/message/friendDetails', {
                    friend_id
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                setFriendDetails(friendDetails.data.friendDetails[0]);
            }; friendDetailsFunction();
        } catch (error) {
            console.log('error in fetching  friend details', error);
        }
    }, [])


  return (
    <div className='flex justify-start items-center gap-2'>
        <img className='w-12 rounded-full [@media(max-width:400px)]:w-8' src={friendDetails.user_profile_url} alt={friendDetails.user_name}></img>
        <div className='text-xl font-semibold truncate' >{friendDetails.user_name}</div>
    </div>
  )
}

export default FriendInfo;