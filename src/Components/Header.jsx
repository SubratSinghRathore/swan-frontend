import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {

    const [profilePhoto, setprofilePhoto] = useState([]);
    const [userName, setuserName] = useState([]);

    useEffect(() => {
        const userDetailsFunc = async () => {
            await fetch("https://reqbin.com/echo/get/json", {
                method: 'GET',
                headers: {
                    userId: "localStorage.userId"
                }
            })
        }
        userDetailsFunc();
    }, [profilePhoto]);

    return (
        <>
            <div className='flex p-1 justify-between '>
                <div>
                    <NavLink to={"https://youtube.com"} >
                        <img className='h-9' src={profilePhoto} alt="logo" />
                    </NavLink>
                    <span>{userName}</span>
                </div>

            </div>

            <hr />
        </>
    )
}