import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../atoms/userDataAtom.js';
import io from 'socket.io-client';
import sendAudio from '../assets/send-message.mp3';
import { axiosInstance } from '../../axios/axiosInstance.js';
import FriendInfo from './FriendInfo.jsx'
import previousChat from '../utilities/previousChat.js';


function Messages() {

  const allOnlineUsers = useRef(null);
  const currentOnlineUsers = useRef([]);
  const userData = useRecoilValue(userDataAtom);
  const socketRef = useRef(null);
  const input = useRef(null);
  const lastOneMessage = useRef(null);
  const messageBody = useRef(null);
  const scrollToBotom = useRef(null);
  const selectedUserRef = useRef(null);
  const friendRef = useRef(null);
  const audio = new Audio(sendAudio);
  const [selectedUser, setSelectedUser] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState([]);
  const [messages, setMessages] = useState([])

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

  useEffect(() => {
    if (selectedUser) {
      selectedUserRef.current = selectedUser;
      (async () => {
        const selectedUserDetailsFunc = await axiosInstance.post('/message/friendDetails', {
          friend_id: selectedUser
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        setSelectedUserDetails(selectedUserDetailsFunc.data.friendDetails[0]);
      })();

      //Grab userprevious chats
      previousChat(userData.userData.user_id, selectedUser).then((res) => { setMessages(res) })

    }


  }, [selectedUser])


  useEffect(() => {

    socketRef.current = io('https://swan-backend.onrender.com', {
      withCredentials: true
    })

    socketRef.current.on('connect', () => {

      socketRef.current.emit('setStatus', userData.userData.user_id);
      socketRef.current.on('allUsers', (array) => { allOnlineUsers.current = array; });

    })


    socketRef.current.on('server-to-client-message', (obj) => {
      if (selectedUserRef.current === obj.from) {
        audio.play();
        setMessages(pre => [...pre, { sender_id: obj.from, message: obj.message }]);
      }
    })


    return () => {
      socketRef.current.disconnect();
    }
  }, [])


  useEffect(() => {
    if (allOnlineUsers.current?.length > 0) {
      currentOnlineUsers.current.push(allOnlineUsers.current.map(i => i[0]));
    }
  }, [allOnlineUsers.current])

  function Online({ friend_id }) {
    for (var i = 0; i < currentOnlineUsers.current; i++) {
      if (friend_id == currentOnlineUsers.current[i]) {
        return <><div className='h-3 w-3 rounded-full absolute bottom-2 text-green-500 text-xs left-16'>online</div></>
      }
    }
    return <></>
  }


  useEffect(() => {
    scrollToBotom.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages])


  function send() {

    if (!input.current.value) {
    } else {
      lastOneMessage.current = input.current.value
      socketRef.current.emit('client-to-server-message', { from: userData.userData.user_id, to: selectedUser, message: lastOneMessage.current });
      setMessages(pre => [...pre, { sender_id: userData.userData.user_id, message: lastOneMessage.current }]);
      input.current.value = null;
    }
  }


  return (
    <div className="flex sm:h-[calc(100vh-70px)] h-[calc(100vh-185px)] w-full">
      {/* Left - User List */}
      <div ref={friendRef} className="sm:min-w-32 w-60 border-l p-4 overflow-y-auto bg-gray-50 h-full [@media(max-width:400px)]:w-[40%] [@media(max-width:500px)]:w-full">
        <div className="flex justify-between items-center font-semibold text-2xl mb-4 text-blue-600">
          Messages
          <Link to='/feed'>
            <IoMdArrowRoundBack />
          </Link>
        </div>
        {friendList.map((friend) => (
          <div key={friend.friend_id} onClick={() => { setSelectedUser(friend.friend_id); friendRef.current.style.display = 'none' }} className={`p-2 cursor-pointer rounded hover:bg-blue-100 relative`}>
            <FriendInfo friend_id={friend.friend_id} />
            <Online friend_id={friend.friend_id} />
          </div>
        ))}
      </div>
      {/* Right - Chat Area */}
      <div className="flex-1 flex flex-col border-r w-full">
        {selectedUser ?
          <div className='flex justify-between items-center border-b font-bold text-lg bg-gray-100 h-15'>
            <div className=" flex gap-3 justify-start items-center">
              <img width='38px' className='rounded-full' src={selectedUserDetails.user_profile_url} alt="user_profile" />
              {selectedUserDetails.user_name}
            </div>
            <IoMdArrowRoundBack onClick={() => { friendRef.current.style.display = 'block'; setSelectedUser(null) }} className='m-4 text-2xl text-blue-600' />
          </div> : null}

        {selectedUser ?
          <div ref={messageBody} className="flex flex-col gap-[10px] h-full overflow-y-auto p-4 ">
            {messages.map((message, index) => (
              <div key={index} className='flex flex-col w-full'>
                <div className={message.sender_id === userData.userData.user_id ? 'text-black sm:text-2xl bg-gray-300 self-end p-3 rounded-2xl rounded-tr-none max-w-[80%] break-words' : 'max-w-[80%] break-words text-white sm:text-2xl bg-blue-500 self-start p-3 rounded-2xl rounded-tl-none'}>{message.message}</div>
              </div>
            ))}
            <div ref={scrollToBotom} />
          </div> : null}
        {/* Bottom input and send button */}
        {selectedUser ?
          <div className='grid sm:grid-cols-7 grid-cols-6 items-center justify-center w-full p-3'>
            <label htmlFor="send" className='sm:col-span-6 col-span-5'>
              <input ref={input} onKeyDown={(e) => e.key === 'Enter' ? send() : null} type="text" autoFocus placeholder='Type your message...' className='w-full h-12 outline p-3 sm:text-2xl text-xl rounded-l-full focus border-r-0' />
            </label>
            <button type='submit' onClick={send} className=' text-5xl text-white bg-blue-500 hover:bg-blue-600 w-full flex justify-center rounded-r-full border border-blue-600 '><VscSend className='hover:translate-x-2 duration-200 w-full' /></button>
          </div> : null}
      </div>
    </div>
  );
}

export default Messages;