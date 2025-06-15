import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { axiosInstance } from '../../axios/axiosInstance';
import { displayFriendsAtom } from '../atoms/userDataAtom';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

function Friends() {

    const serDisplayFriend = useSetRecoilState(displayFriendsAtom);

    return (
        <div>
            <div className='bg-white flex gap-4 flex-col items-start justify-start absolute z-200 sm:top-1 sm:left-60 bottom-10 left-10 border sm:p-10 p-3 m-auto border-gray-600 rounded-2xl shadow-2xl w-[80vw] scroll-auto overflow-scroll'>
                <div className="flex justify-start items-center gap-4 font-semibold text-2xl text-blue-600">
                    <IoMdArrowRoundBack className='cursor-pointer' onClick={() => serDisplayFriend(false)} />
                    <div>friends</div>
                </div>
                <Allfriends />
            </div>
        </div>
    )
}


function Allfriends() {

    const [FriendList, setFriendList] = useState([]);

    useEffect(() => {
        const allFriends = async () => {
            const friends = await axiosInstance.get('/message/friends', {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            setFriendList(friends.data.allFriends)
        }; allFriends();
    }, [])

    return (
        <>
            <div>
                {FriendList.map(friend => {
                    return (
                        <div className='w-[70vw] pl-6 pt-2 m-4 pb-2 border-b border-b-stone-600' key={friend.friend_id}>
                            <FriendInfo friend_id={friend.friend_id} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}


function FriendInfo({ friend_id }) {

    const [friendDetails, setFriendDetails] = useState([])

    useEffect(() => {
        try {
            const friendDetailsFunction = async () => {
                const friendDetails = await axiosInstance.post('/message/friendDetails', {
                    friend_id
                }, {
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


    async function unfriend(friend_id) {
        try {
            const unfriend = await axiosInstance.delete('/message/unfriend', {
                data: {friend_id: friend_id}
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (unfriend.data.msg === 'unfriend sucessfully') {return 'removed'}
            else {return 'retry'}
        } catch (error) {
            console.log('error in removing friend', error);
        }
    }


    return (
        <div className='flex justify-between items-center'>
            <div className='flex justify-start items-center gap-2'>
                <img className='w-12 rounded-full' src={friendDetails.user_profile_url} alt={friendDetails.user_name}></img>
                <div className='sm:text-2xl font-semibold' >{friendDetails.user_name}</div>
            </div>
            <div className='flex justify-center items-center gap-6'>
                <Link to='messages'>
                <button className='bg-blue-600 hover:bg-blue-700 pt-2 pb-2 pl-4 pr-4 rounded-xl cursor-pointer text-sky-50' type="button">message</button>
                </Link>
                <button className='bg-white hover:bg-gray-200 pt-2 pb-2 pl-4 pr-4 rounded-xl cursor-pointer border-gray-600 border-collapse border' type='button' onClick={async (e) => {const msg = await unfriend(friendDetails.user_id); e.target.innerHTML = msg;}}>Unfriend</button>
            </div>
        </div>
    )
}


export default Friends