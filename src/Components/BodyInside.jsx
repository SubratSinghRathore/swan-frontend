import React from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { displaySettingsAtom, displayProfileAtom, displayNotificationAtom } from '../atoms/userDataAtom.js';
import Settings from './Settings.jsx';
import Profile from './Profile.jsx';
import Notification from './Notification.jsx';
import Feed from './Feed.jsx';
import BodyContent from './BodyContent.jsx';
import Suggestions from './Suggestions.jsx';

function BodyInside() {
    return (
        <>

            <BodyLeft />
            <BodyRight />


        </>
    )
}

function BodyRight() {

    const displaySettings = useRecoilValue(displaySettingsAtom);
    const displayProfile = useRecoilValue(displayProfileAtom);
    const displayNotification = useRecoilValue(displayNotificationAtom);

    return (
        <>
            <div className="body_right">

                {displaySettings && <Settings />}

                {displayProfile && <Profile />}

                {displayNotification && <Notification />}

                <Suggestions />

            </div>
        </>
    )
}

function BodyLeft() {


    return (
        <>
            <div className='overflow-scroll sm:w-3/4 h-[calc(100vh-5rem)]'>
                <Feed />
            </div>
            <BodyContent />
        </>
    )
}

export default BodyInside