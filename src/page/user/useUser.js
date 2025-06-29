import { useEffect, useState } from "react";
import useNetwork from "../../hooks/useNetwork";
import { axiosInstance } from "./../../../axios/axiosInstance";

export default function useUser({ userId }) {
  if (!userId) throw new Error("userId is required");

  const [visibleFriendIds, setVisibleFriendIds] = useState([]); // IDs currently shown
  const [friendDetails, setFriendDetails] = useState([]);
  const [loadingMoreFriends, setLoadingMoreFriends] = useState(false);

  // 1. Fetch user data
  const [userData, userDataLoading, userDataError] = useNetwork({
    url: "/message/friendDetails",
    method: "post",
    body: { friend_id: userId },
  });

  // 2. Fetch all friend IDs
  const [friendsData, friendsDataLoading, friendsDataError] = useNetwork({
    url: "/message/friends",
    method: "post",
    body: { user_id: userId },
  });

  // 3. Fetch posts
  const [postsData, postsDataLoading, postsDataError] = useNetwork({
    url: "/post/all",
    method: "post",
    body: { user_id: userId },
  });

  // 4. Automatically fetch first 3 friend IDs
  useEffect(() => {
    if (friendsData?.allFriends?.length > 0) {
      const firstThree = friendsData.allFriends
        .slice(0, 3)
        .map((f) => f.friend_id);
      setVisibleFriendIds(firstThree);
    }
  }, [friendsData]);

  // 5. Fetch friendDetails using axiosInstance (not fetch)
  useEffect(() => {
    async function fetchDetails() {
      if (visibleFriendIds.length === 0) return;

      setLoadingMoreFriends(true);

      try {
        const responses = await Promise.all(
          visibleFriendIds.map((id) =>
            axiosInstance.post("/message/friendDetails", { friend_id: id })
          )
        );

        const details = responses.map((res) => res.data);
        setFriendDetails(details);
      } catch (err) {
        console.error("Error fetching friend details:", err);
      } finally {
        setLoadingMoreFriends(false);
      }
    }

    fetchDetails();
  }, [visibleFriendIds]);

  // 6. Load more friends
  function loadMoreFriends() {
    const currentCount = visibleFriendIds.length;
    const nextBatch = friendsData?.allFriends
      ?.slice(currentCount, currentCount + 3)
      .map((f) => f.friend_id);

    if (nextBatch?.length > 0) {
      setVisibleFriendIds((prev) => [...prev, ...nextBatch]);
    }
  }

  return {
    userData,
    userDataLoading,
    userDataError,

    postsData,
    postsDataLoading,
    postsDataError,

    friendsIds: friendsData?.allFriends ?? [],
    friendDetails,
    loadingMoreFriends,
    loadMoreFriends,
  };
}
