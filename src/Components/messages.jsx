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


export default function MessageComponent() {

  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const allFriends = async () => {
      const friends = await axiosInstance.get('/message/friends',{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      setFriendList(friends.data.allFriends)
    }; allFriends();
  }, [])

  const userData = useRecoilValue(userDataAtom);
  const socketRef = useRef(null);
  const input = useRef(null);
  const audio = new Audio(sendAudio);


  useEffect(() => {

    socketRef.current = io('http://localhost:3000', {
      withCredentials: true
    })

    socketRef.current.emit('setStatus', userData.userData.user_id);
    socketRef.current.on('allUsers', (array) => { for (const [a, b] of array) console.log(a, b) });


    socketRef.current.on('server-to-client-message', (msg) => {
      console.log(msg)
    })


    return () => {
      socketRef.current.disconnect();
    }
  }, [])



  function send() {

    if (!input.current.value) {
    } else {
      audio.play();

      socketRef.current.emit('client-to-server-message', { to: 3, message: input.current.value });

      input.current.value = null;
    }
  }



  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (text.trim()) {
      setMessages([...messages, { text, sender: 'me' }]);
      setText('');
    }
  };

  return (
    <div className="flex sm:h-[calc(100vh-70px)] h-[calc(100vh-110px)]">
      {/* Left - User List */}
      <div className="sm:min-w-32 w-60 border-l p-4 overflow-y-auto bg-gray-50">
        <div className="flex justify-between items-center font-semibold text-2xl mb-4 text-blue-600">
          Messages
          <Link to='/'>
            <IoMdArrowRoundBack />
          </Link>
        </div>
        {friendList.map((friend) => (
          <div key={friend.friend_id} onClick={() => setSelectedUser(friend.friend_id)} className={`p-2 cursor-pointer rounded hover:bg-blue-100`}>
            <FriendInfo friend_id={friend.friend_id} />
          </div>
        ))}
      </div>
      {/* Right - Chat Area */}
      <div className="flex-1 flex flex-col border-r min-w-[calc(100vh-410px)]">
        <div className="p-4 border-b font-bold text-lg bg-gray-100 h-15">
          {selectedUser.name}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`max-w-xs p-2 rounded-lg ${msg.sender === 'me' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-300 text-black'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        {/* Bottom input and send button */}
        <div className='grid grid-cols-7 gap-2 items-center justify-center w-full p-3'>
          <label htmlFor="send" className='col-span-6'>
            <input ref={input} onKeyDown={(e) => e.key === 'Enter' ? send() : null} type="text" autoFocus placeholder='Type your message...' className='w-full h-12 outline p-3 text-2xl rounded-sm focus' />
          </label>
          <button type='submit' onClick={send} className='text-5xl text-white bg-blue-500 hover:bg-blue-600 w-full flex justify-center rounded-sm border border-blue-600 '><VscSend className='hover:translate-x-2 duration-200 w-full' /></button>
        </div>
      </div>
    </div>
  );
}