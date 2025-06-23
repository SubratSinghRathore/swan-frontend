import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios/axiosInstance';
import { FaThumbsUp } from 'react-icons/fa';
import likeAudio from '../assets/bell-notification-337658.mp3';
import { useSetRecoilState } from 'recoil';
import { displaySettingsAtom, displayProfileAtom, displayNotificationAtom, updateProfileAtom, displayUploadMemoryAtom, displaySearchAtom } from '../atoms/userDataAtom.js';

function Feed() {

  const audio = new Audio(likeAudio);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);

  //For clearing all component if opened
  const displaySettings = useSetRecoilState(displaySettingsAtom);
  const displayProfile = useSetRecoilState(displayProfileAtom);
  const displayNotification = useSetRecoilState(displayNotificationAtom);
  const updateProfile = useSetRecoilState(updateProfileAtom);
  const displayUploadMemory = useSetRecoilState(displayUploadMemoryAtom);
  const displaySearch = useSetRecoilState(displaySearchAtom);

  function closeAllOpenedComponents() {
    displaySettings(false);
    displayProfile(false);
    displayNotification(false);
    updateProfile(false);
    displayUploadMemory(false);
    displaySearch(false);
  }

  async function likeFunc(id) {
    audio.play();
    const likePost = await axiosInstance.put('/post/like', {
      post_id: id
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    return (likePost.data.total_likes);
  }


  useEffect(() => {
    axiosInstance.post('/feed/posts', {
      offset
    }, {
      headers: {
        "Content-type": "application/json"
      },
      withCredentials: true
    })
      .then((res) => {
        setPosts(res.data.posts)
      })
  }, [offset]);


  function PostOrigin({ origin }) {
    const [username, setUsername] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
      try {
        const postOrigin = async function () {


          const data = await axiosInstance.post('/feed/post/origin', {
            origin
          }, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          });
          setUsername(data.data.originDetails[0].user_name);
          setProfile(data.data.originDetails[0].user_profile_url);


        };

        postOrigin();
      } catch (error) {
        console.log("error in setting origin to post", error);
      }
    }, [origin])



    return (
      <div className='flex justify-start items-center'>
        <img className='w-8 h-8 rounded-full border-b-gray-600 m-1' src={profile} alt={username} loading='lazy' />
        <div>{username}</div>
      </div>
    )

  }


  function exceedLikes(likes) {
    if (likes > 10000000) { return "10M+" }
    else if (likes > 1000000) { return "1M+" }
    else if (likes > 100000) { return "100K+" }
    else if (likes > 10000) { return "10K+" }
    else { return likes }
  }


  return (
    <>
      <div className='flex flex-col m-auto xl:max-w-xl sm:max-w-2/3 h-screen [@media(max-width:400px)]:wscreen' onClick={closeAllOpenedComponents}>
        {posts.map(post => (
          <div key={post.post_id} className='sm:w-full rounded-xl border border-b-gray-600 m-4 shadow-sm shadow-gray-600 '>
            <div className='top_bar p-2'>
              <PostOrigin origin={post.origin} />
            </div>
            <div className='content border border-b-gray-600 border-t-gray-600 border-l-0 border-r-0 '>
              <img className='w-9/2' src={post.post_url} alt="post image" loading='lazy' />
            </div>
            <div className='bottom_bar flex-col justify-start items-center m-4'>
              <div className='max-h-20 w-full overflow-scroll break-words whitespace-normal'>
                {post.description}
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex justify-start relative'>
                  <FaThumbsUp className='m-1 fill-blue-600 w-6 text-2xl' />
                  <div className='flex justify-end items-center cursor-pointer absolute w-[180%] h-[100%] top-[0%] left-[0%]' onClick={async (e) => { const likes = (await likeFunc(post.post_id)); e.target.innerHTML = likes }}>
                    {post.total_likes != 0 ? exceedLikes(post.total_likes) : "Be the first to like"}
                  </div>
                </div>
                <div>{new Date(post.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Feed;