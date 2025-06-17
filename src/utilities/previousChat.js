import { axiosInstance } from "../../axios/axiosInstance";

export default function previousChat(user_id, friend_id) {
    return axiosInstance.post('/message/chats', {
        user_id,
        friend_id
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    .then((res) => {console.log(res.data.messages)
        return (res.data.messages);
    })
    // if(messages) {return messages.data};
}

