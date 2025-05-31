import { atom, selector } from 'recoil';
import { axiosInstance } from '../../axios/axiosInstance.js'

export const userDataAtom = atom({
    key: 'userDataAtom',
    default: selector({
        key: 'userDataSelector',
        get: async () => {
            try {
                const userData = await axiosInstance.get(
                    '/auth/me',
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                return userData.data;

            } catch (error) {
                console.log('Error occured in fetching user data', error);
            }
        }
    })
});


export const displaySettingsAtom = atom({
    key: 'displaySettingsAtom',
    default: false
});


export const displayProfileAtom = atom({
    key: 'displayProfileAtom',
    default: false
});


export const displayNotificationAtom = atom({
    key: 'displayNotification',
    default: false
});