import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios/axiosInstance';
import { FaThumbsUp } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";


function Gallery() {

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const allPostsFunc = async function () {
      const allPosts = await axiosInstance.get('/post/all', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setAllPosts(allPosts.data); console.log(allPosts.data)
    }; allPostsFunc();
  }, []);


  async function postMenu(post_id) {
    
  }


  return (
    <div className='max-w-[100%] flex justify-center items-center flex-wrap'>
      {
        allPosts.map((post => {
          return (
            <div key={post.post_id} className='max-w-[30%] min-w-xs rounded-xl border border-b-gray-600 m-4 shadow-sm shadow-gray-600'>
              <div className='relative'>
                <BsThreeDotsVertical className='absolute top-2 right-2 text-2xl' onClick={() => postMenu(post.post_id)}/>
                <img className='w-[100%] rounded-t-xl' src={post.post_url} alt="post image" loading='lazy' />
              </div>
              <div className='bottom_bar flex-col justify-start items-center m-4'>
                <div className='h-20 w-full overflow-scroll break-words whitespace-normal'>
                  {post.description}
                </div>
                <div className='flex justify-between items-center w-full'>  
                  <div className='flex justify-start items-center'><FaThumbsUp className='m-1 fill-blue-600 w-6 text-2xl'/> {post.total_likes}</div>               
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          )
        }))
      }
    </div>
  )
}

export default Gallery;