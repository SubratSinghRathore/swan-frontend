import React, { useRef, useState } from "react";
import { displaySettingsAtom, userDataAtom } from "../atoms/userDataAtom";
import { FiLogOut } from "react-icons/fi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IoClose } from "react-icons/io5";
import { axiosInstance } from "../../axios/axiosInstance";

const Settings = () => {

  const setdisplaySetting = useSetRecoilState(displaySettingsAtom)
  const otpBtn = useRef(null);
  const passwordBtn = useRef(null);
  const mobileNoBtn = useRef(null);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
    mobileNo: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //send otp
  const sendOtp = async function () {
    if (formData.email) {
      otpBtn.current.innerHTML = 'Sending';
      try {
        const send = await axiosInstance.post('/auth/email/verify', {
          user_email: formData.email
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        if (send.status >= 200 && send.status < 300) {
          otpBtn.current.innerHTML = 'Re-Send';
        } else {
          otpBtn.current.innerHTML = 'Retry';
        }
      } catch (error) {
        otpBtn.current.innerHTML = 'Retry';
      }
    }
  }

  const changeEmail = async function () {
    try {
      const changeEmail = await axiosInstance.post('/auth/update/profile', {
        type: 'user_email',
        new_user_email: formData.email,
        otp: formData.otp
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (changeEmail.status >= 200 && changeEmail.status < 300) {
        window.location = '/feed'
      }
    } catch (error) {

    }
  }


  const changePassword = async function () {
    if (formData.password != formData.confirmPassword) {
      alert('password not match')
    } else if (formData.password.length < 8) {
      alert('password must be 8 characters')
    } else {
      passwordBtn.current.innerHTML = 'Updating Password';
      const pass = await axiosInstance.post('/auth/update/profile', {
        type: 'user_password',
        user_password: formData.password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (pass.data.msg === "password updated successfully") {
        passwordBtn.current.innerHTML = 'Password Updated';
      }
    }

  }


  const changeMobileNo = async function () {
    if (!formData.mobileNo) {
      alert('Oops! Please enter valid Mobile No');
    } else {
      mobileNoBtn.current.innerHTML = "Updating Mobile No"
      const mobileNo = await axiosInstance.post('/auth/update/profile', {
        type: 'user_mobile_no',
        user_mobile_no: formData.mobileNo
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (mobileNo.status >= 200 && mobileNo.status < 300) {
        mobileNoBtn.current.innerHTML = "Mobile No Updated Succesfully";
      }
    }

  };



  return (
    <div className="w-80 sm:w-100 overflow-scroll sm:h-[calc(100vh-120px)] h-[calc(100vh-210px)] bg-white rounded-lg shadow-lg notification_banner z-100 absolute right-2">
      <div className="px-4 py-2 flex justify-between">
        <h2 className="text-lg font-semibold text-blue-600">Settings</h2>
        <IoClose onClick={() => setdisplaySetting(false)} className='text-gray-600 text-2xl' />
      </div>
      <div className="m-4">
        <label className="block mb-1 text-[12px]">Change Email</label>
        <input
          type="email"
          name="email"
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          value={formData.email}
          onChange={handleChange}
          placeholder={userData.userData.user_email}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[92%] flex justify-arround gap-2 m-auto">
          <button ref={otpBtn} onClick={sendOtp} className="w-[60%] bg-blue-500 text-white p-2 rounded-md cursor-pointer" type="button">Send OTP</button>
          <input
            type="text"
            name="otp"
            inputMode="numeric"
            maxLength={6}
            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
            className="w-[40%] p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            value={formData.otp}
            onChange={handleChange}
            placeholder='000000'
          />
        </div>
        <button onClick={changeEmail} className="w-[92%] m-2 bg-blue-500 text-white p-2 rounded-md cursor-pointer" type="button">Change Email</button>
      </div>
      <div className="m-4">
        <label className="block mb-1 text-[12px]">Change Password</label>
        <input
          type="password"
          name="password"
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          value={formData.password}
          onChange={handleChange}
          placeholder='New Password'
        />
        <input
          type="password"
          name="confirmPassword"
          className="w-full border mt-2 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder='Confirm Password'
        />
        <button onClick={changePassword} ref={passwordBtn} className="w-[100%] mt-2 bg-blue-500 text-white p-2 rounded-md cursor-pointer" type="button">Change Password</button>
      </div>
      <div className="m-4">
        <label className="block mb-1 text-[12px]">Change Mobile No</label>
        <input
          type="tel"
          name="mobileNo"
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          value={formData.mobileNo}
          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
          onChange={handleChange}
          placeholder={userData.userData.user_mobile_no}
        />
        <button onClick={changeMobileNo} ref={mobileNoBtn} className="w-[100%] mt-2 bg-blue-500 text-white p-2 rounded-md cursor-pointer" type="button">Change Mobile No</button>
      </div>
      <div className="m-4">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg border border-gray-500 hover:bg-gray-200 transition">
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
