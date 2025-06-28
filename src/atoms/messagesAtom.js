import { atom, selector } from "recoil";
import { axiosInstance } from "../../axios/axiosInstance";

export const notificationCountAtom = atom({
    key: 'notificationCount',
    default: selector({
        key: 'notificationCountSelector',
        get: async function () {
            const getNotifications = await axiosInstance.get('/message/notification', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            return (getNotifications.data.notifications.length);
        }
    })
})