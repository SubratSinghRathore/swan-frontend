import useNetwork from "../../hooks/useNetwork";

export default function useUser() {
  const [userData, userDataLoading, userDataError] = useNetwork({
    url: "/message/friendDetails",
    method: "post",
    body: {
      friend_id: 3,
    },
  });
  const [friendsData, friendsDataLoading, friendsDataError] = useNetwork({
    url: "/message/friends/",
    method: "get",
    body: {
      user_id: 3,
    },
  });
  const [postsData, postsDataLoading, postsDataError] = useNetwork({
    url: "/post/all",
    method: "get",
    body: {
      user_id: 3,
    },
  });

  console.log("userData", userData);
  console.log("friendsData", friendsData);
  console.log("postsData", postsData);
  return {};
}
