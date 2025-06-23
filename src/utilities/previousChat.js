import { axiosInstance } from "../../axios/axiosInstance";

export default function previousChat(user_id, friend_id) {
    return axiosInstance.post('/message/chats', {
        friend_id
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then((res) => {
        return (res.data.messages);
    })
    // if(messages) {return messages.data};
}

