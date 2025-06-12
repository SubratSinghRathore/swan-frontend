import React from 'react'
import { useEffect, useRef } from 'react'
import { axiosInstance } from '../../axios/axiosInstance'
import { useState } from 'react'
import addFriendAudio from '../assets/new-notification-010-352755.mp3'

function Suggestions() {

    const audio = new Audio(addFriendAudio);
    const [allExistingUsers, setAllExistingUsers] = useState([]);

    useEffect(() => {

        try {
            const users = async () => {
                const users = await axiosInstance.get('/auth/users', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                setAllExistingUsers(users.data.users)
            };
            users();
        } catch (error) {

        }
    }, [])

    function addFriend() {
        audio.play()
    }


    return (
        <div className="w-80 sm:w-90 overflow-scroll h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg notification_banner right-2 z-50 absolute top-2">
            <div className="px-4 py-2 flex justify-between text-blue-600 text-2xl font-medium">
                Suggestions
            </div>
            <div className="text-center px-4">
                <div className='grid grid-cols-2 gap-4 m-4'>
                    {allExistingUsers.map(user => {
                        return (
                            <div className='w-full p-2 shadow-gray-500 shadow rounded-2xl flex flex-col justify-center items-center' key={user.user_id}>
                                <img className='rounded-full border border-b-neutral-500 w-full' src={user.user_profile_url} alt={user.user_name} />
                                <div className='p-2'>{user.user_name}</div>
                                <button className='bg-blue-600 hover:bg-blue-700 pt-2 pb-2 pl-4 pr-4 rounded-xl cursor-pointer text-sky-50' onClick={addFriend}>add friend</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Suggestions