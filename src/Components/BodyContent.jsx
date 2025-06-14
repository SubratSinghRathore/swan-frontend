import React from 'react';
import { useRecoilValue } from 'recoil';
import { displayUploadMemoryAtom, displayFriendsAtom } from '../atoms/userDataAtom.js'
import Upload from './upload.jsx';
import Friends from './Friends.jsx';

function BodyContent() {

    const displayUploadMemory = useRecoilValue(displayUploadMemoryAtom);
    const displayFriends = useRecoilValue(displayFriendsAtom);
    return (
        <>
            {!!displayUploadMemory && <Upload />}
            {!!displayFriends && <Friends />}
        </>
    )
}

export default BodyContent