import React from 'react';
import { useRecoilValue } from 'recoil';
import { displayUploadMemoryAtom } from '../atoms/userDataAtom.js'
import Upload from './upload.jsx';

function BodyContent() {

    const displayUploadMemory = useRecoilValue(displayUploadMemoryAtom);

    return (
        <>
            {!!displayUploadMemory && <Upload />}
        </>
    )
}

export default BodyContent