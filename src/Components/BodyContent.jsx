import React from 'react';
import { useRecoilValue } from 'recoil';
import { displayUploadMemoryAtom, displayFriendsAtom, displaySearchAtom } from '../atoms/userDataAtom.js'
import Upload from './upload.jsx';
import Friends from './Friends.jsx';
import Search from './search.jsx';

function BodyContent() {

    const displayUploadMemory = useRecoilValue(displayUploadMemoryAtom);
    const displayFriends = useRecoilValue(displayFriendsAtom);
    const displaySearch = useRecoilValue(displaySearchAtom);
    return (
        <>
            {!!displayUploadMemory && <Upload />}
            {!!displayFriends && <Friends />}
            {!!displaySearch && <Search />}
        </>
    )
}

export default BodyContent