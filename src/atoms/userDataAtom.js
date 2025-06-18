import { atom, selector } from 'recoil';
import { axiosInstance } from '../../axios/axiosInstance.js'

export const userDataAtom = atom({
  key: 'userDataAtom',
  default: selector({
    key: 'userDataSelector',
    get: async () => {
      try {
        const res = await axiosInstance.get('/auth/me', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return res.data;
      } catch (err) {
        console.error('Error fetching user data:', err);
        return null;
      }
    },
  })
});
// export const userDataAtom = selector({
//   key: 'userDataSelector',
//   get: async () => {
//     try {
//       const res = await axiosInstance.get('/auth/me', {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       return res.data;
//     } catch (err) {
//       console.error('Error fetching user data:', err);
//       return null;
//     }
//   },
// });

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


export const updateProfileAtom = atom({
  key: 'updateProfileAtom',
  default: false
});


export const displayUploadMemoryAtom = atom({
  key: 'uploadMemory',
  default: false
});


export const displayFriendsAtom = atom({
  key: 'displayFriends',
  default: false
});


export const displaySearchAtom = atom({
  key: 'displaySearch',
  default: false
});