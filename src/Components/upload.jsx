import React, { useState, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { FiUpload } from 'react-icons/fi';
import { axiosInstance } from '../../axios/axiosInstance';
import { displayUploadMemoryAtom } from '../atoms/userDataAtom';

function Upload() {

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const uploadBtn = useRef(null)
    const uploadMemo = useRef(null)
    const uploadMemory = useSetRecoilState(displayUploadMemoryAtom);

    function submitHandle(e) {
        e.preventDefault();

        if (!file) {
            uploadMemo.current.innerHTML = 'Please select photo'
        } else {
            const reader = new FileReader();
            uploadBtn.current.innerHTML = 'Uploading...'
            reader.onloadend = async () => {
                const base64File = reader.result;
                try {
                    const upload = await axiosInstance.post('/post/image', {
                        image: base64File,
                        description
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    })
                    if (upload.data.msg === 'upload successful') {
                        uploadBtn.current.innerHTML = "Done";
                        setTimeout(() => {
                            uploadMemory(false)
                        },500);
                    } else {
                        uploadBtn.current.innerHTML = "Oops' Please retry";
                    }
                } catch (error) {
                    console.log('error in file upload', error);
                }
            };
            reader.readAsDataURL(file);
        }
    }


    return (
        <>
            <form onSubmit={submitHandle}>
                <div className='bg-white flex gap-4 flex-col items-center absolute sm:top-1 sm:left-60 sm:w-[60%] w-[80%] top-5 left-[10%] border sm:p-10 p-3 m-auto border-gray-600 rounded-2xl shadow-2xl '>
                    <label className=" w-[80%] flex items-center gap-2 cursor-pointer text-white bg-blue-600 justify-center p-4 rounded-2xl hover:bg-blue-700">
                        <FiUpload className="sm:text-2xl text-xl" />
                        <span className='sm:text-2xl text-xl' ref={uploadMemo}>upload your memories</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0])} />
                    </label>
                    <input type="text" placeholder="What's in your mind!" className="w-[80%] h-3xl border p-2 sm:text-2xl text-xl rounded-sm" onChange={(e) => setDescription(e.target.value)} />
                    <button ref={uploadBtn} type='submit' onSubmit={submitHandle} className='w-[60%] text-xl text-white items-center align-middle bg-blue-600 justify-center p-2 rounded-2xl hover:bg-blue-700'>Upload</button>
                </div>
            </form>
        </>
    )
}

export default Upload