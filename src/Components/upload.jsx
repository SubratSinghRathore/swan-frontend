import React from 'react'
import { useSetRecoilState } from 'recoil'
import { FiUpload } from 'react-icons/fi';

function Upload() {

    function uploadMemory() {

    }


    return (
        <>
            <div className='flex gap-4 flex-col items-center absolute sm:top-60 sm:left-60 border p-10 m-4 border-gray-600 rounded-2xl shadow-2xl'>
                <label className="sm:w-100 w-50 flex items-center gap-2 cursor-pointer text-white bg-blue-600 justify-center p-4 rounded-2xl hover:bg-blue-700">
                    <FiUpload className="text-2xl" />
                    <span className='text-2xl'>upload your memories</span>
                    <input type="file" accept="image/*" className="hidden" />
                </label>
                <input type="text" placeholder="What's in your mind!" className="sm:w-100 w-50 h-3xl border p-2 text-2xl rounded-sm" />
                <button onClick={uploadMemory} className='text-white w-60 items-center align-middle bg-blue-600 justify-center p-2 rounded-2xl hover:bg-blue-700'>Upload</button>
            </div>

        </>
    )
}

export default Upload