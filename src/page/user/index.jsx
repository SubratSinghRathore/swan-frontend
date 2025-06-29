import React from "react";
import useUser from "./useUser";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Post from "./components/Post";

export default function User() {
  const { id } = useParams();
  const {
    userData,
    userDataLoading,
    userDataError,

    postsData,
    postsDataLoading,
    postsDataError,

    friendDetails,
    loadingMoreFriends,
    loadMoreFriends,
  } = useUser({ userId: 3 });

  if (!userData || !postsData) return <main>loading</main>;

  const friends = friendDetails
    ?.map((item) => item.friendDetails?.[0])
    .filter(Boolean);
  console.log(friends);
  return (
    <main>
      <Header />
      <div className="px-2 my-4">
        <img
          className="w-30 aspect-square rounded-full "
          src="https://res.cloudinary.com/dfaweaiq5/image/upload/v1750360560/yfqhbnhzhao3cyeabr7s.jpg"
          alt=""
        />
        <h2 className="px-2 text-xl font-semibold">Subrat Singh</h2>
      </div>

      <span className="bg-white my-4 block px-2 rounded-2xl">Friends</span>

      <div className=" px-2">
        {friends?.map((item) => (
          <Friend
            key={item.user_id}
            imgUrl={item.user_profile_url}
            name={item.user_name}
          />
        ))}
        {friends?.length <= 3 && (
          <button
            onClick={loadMoreFriends}
            className="flex w-full justify-center my-4"
          >
            Show More
          </button>
        )}
      </div>

      <span className="bg-white my-4 block px-2 rounded-2xl">Posts</span>
      {postsData?.map((item) => (
        <Post
          key={item.post_id}
          description={item.post_description}
          post_url={item.post_url}
          total_likes={item.total_likes}
          created_at={item.created_at}
        />
      ))}
    </main>
  );
}

function Friend({
  imgUrl = "https://res.cloudinary.com/dfaweaiq5/image/upload/v1750360560/yfqhbnhzhao3cyeabr7s.jpg",
  name,
}) {
  return (
    <div className="flex gap-4 items-center my-2">
      <img
        className="w-10 aspect-square rounded-full"
        src={imgUrl}
        alt="User"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{name}</span>
      </div>
    </div>
  );
}
