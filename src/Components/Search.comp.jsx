import React, { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSetRecoilState } from 'recoil';
import { displaySearchAtom } from '../atoms/userDataAtom.js';
import { axiosInstance } from '../../axios/axiosInstance.js';

function Search() {

    const displaySearch = useSetRecoilState(displaySearchAtom);
    const [allUsers, setAllUsers] = useState([])

    async function searchUser(user_name) {
        const searchUsers = await axiosInstance.post('/auth/search', {
            user_name
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        setAllUsers(searchUsers.data.allUsers);
    }


    async function addFriend(user_id) {
        try {
            const addFriend = await axiosInstance.post('/message/addfriend', {
                friend_id: user_id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (addFriend.status >= 200 && addFriend.status < 300) {
                return 'done';
            } else {
                return 'Oops retry';
            }
        } catch (error) {
            console.log('error in making friend', error);
            return 'Oops retry';
        }
    }


    return (
        <div>
            <div className='bg-white sm:flex gap-4 flex-col items-start justify-start absolute z-200 w-[100%] sm:top-1 sm:left-60 left-0 border sm:p-10 p-3 sm:m-auto border-gray-600 rounded-2xl shadow-2xl sm:w-[60%] scroll-auto overflow-scroll'>
                <div className="flex justify-between items-center gap-4 font-semibold text-2xl text-blue-600 w-full">
                    <IoMdArrowRoundBack className='cursor-pointer text-4xl' onClick={() => displaySearch(false)} />
                    <div className='w-full'>
                        <input type="text" placeholder='search...' onChange={(e) => searchUser(e.target.value)} className='w-full text-black h-12 outline p-3 pl-5 sm:text-2xl text-xl rounded-full focus border-r-0' />
                    </div>
                </div>
                <div className='w-[90%]'>
                    {allUsers.map((user, index) => (
                        <div className='flex justify-between items-center w-[100%] pt-2 m-4 pb-2 border-b border-b-stone-600' key={index}>
                            <div className='flex justify-start items-center gap-2'>
                                <img className='w-12 rounded-full [@media(max-width:400px)]:w-8' src={user.user_profile_url} alt={user.user_name}></img>
                                <div className='text-xl font-semibold [@media(max-width:400px)]:text-sm' >{user.user_name}</div>
                            </div>
                            <button onClick={async (e) => { const mark = await addFriend(user.user_id); e.target.innerHTML = mark }} className='bg-blue-600 hover:bg-blue-700  pt-2 pb-2 pl-4 pr-4 rounded-xl cursor-pointer text-sky-50' type="button">
                                add friend
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search;