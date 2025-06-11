import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios/axiosInstance';
import { FaThumbsUp } from 'react-icons/fa';

function Feed() {


  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);

  
  async function likeFunc(id) {
    const likePost = await axiosInstance.put('/post/like',{
      post_id: id
    },{
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    if (likePost.statusText === 'OK') {
      console.log('done')
    }
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
        <img className='w-8 h-8 rounded-full border-b-gray-600 m-1' src={profile} alt={username} loading='lazy'/>
        <div>{username}</div>
      </div>
    )

  }


  function exceedLikes(likes) {
    if (likes > 10000000) { return "10M+ Likes" }
    else if (likes > 1000000) { return "1M+ Likes" }
    else if (likes > 100000) { return "100K+ Likes" }
    else if (likes > 10000) { return "10K+ Likes" }
    else { return likes + " Likes" }
  }


  return (
    <>
      <div className='flex flex-col m-auto xl:max-w-xl max-w-1/2 h-screen'>
        {posts.map(post => (
          <div key={post.post_id} className='w-full rounded-xl border border-b-gray-600 m-4 shadow-sm shadow-gray-600'>
            <div className='top_bar p-2'>
              <PostOrigin origin={post.origin} />
            </div>
            <div className='content border border-b-gray-600 border-t-gray-600 border-l-0 border-r-0'>
              <img className='w-9/2' src={post.post_url} alt="post image" loading='lazy'/>
            </div>
            <div className='bottom_bar flex-col justify-start items-center m-4'>
              <div className='max-h-20 w-full overflow-scroll break-words whitespace-normal'>
                {post.description}
              </div>
              <div className='flex justify-start items-center'>
                <FaThumbsUp onClick={() => likeFunc(post.post_id)} className='cursor-pointer m-1 fill-blue-600 w-6 text-2xl'/>
                {post.total_likes != 0 ? exceedLikes(post.total_likes) : "Be the first to like"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Feed;