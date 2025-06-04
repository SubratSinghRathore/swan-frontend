import React from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { displaySettingsAtom, displayProfileAtom, displayNotificationAtom } from '../atoms/userDataAtom.js';
import Settings from './Settings.jsx';
import Profile from './Profile.jsx';
import Notification from './Notification.jsx';

function BodyInside() {
    return (
        <>

            <BodyLeft />
            <BodyRight />


        </>
    )
}

function BodyRight() {

    const displaySettings = useRecoilValue(displaySettingsAtom);
    const displayProfile = useRecoilValue(displayProfileAtom);
    const displayNotification = useRecoilValue(displayNotificationAtom);

    return (
        <>
            <div className="body_right">

                {displaySettings && <Settings />}

                {displayProfile && <Profile />}

                {displayNotification && <Notification />}
            </div>
        </>
    )
}

function BodyLeft() {

    return (
        <>
            <div className='w-[calc(100vw-60px)] body_left h-[calc(100vh-68px)] overflow-y-scroll'>
                body main Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam in animi commodi quasi corrupti, atque, excepturi iste tenetur voluptate magnam deleniti vel minima itaque facere iusto explicabo cupiditate tempora nihil! Asperiores, quod debitis? Cum ab deserunt ipsa neque nam tempora dolorum tempore quia sequi voluptatibus! Sint veritatis est perspiciatis eligendi. Assumenda excepturi aut veniam nihil eveniet! Adipisci minima tempora nam dolorum natus magnam quam soluta quae impedit earum aspernatur nobis, commodi sunt ad neque sint debitis atque beatae, necessitatibus eius excepturi! Cupiditate nisi nesciunt porro eligendi repudiandae, dolor quidem sed ratione obcaecati voluptatem deserunt doloribus quasi velit, fugiat itaque sunt mollitia! Sequi quasi doloribus iste dignissimos aliquid fugit architecto beatae adipisci aperiam inventore? Fugit sunt provident fugiat eos autem facere labore numquam, delectus voluptatibus saepe, consequuntur doloremque nulla excepturi earum, dolorum quibusdam aspernatur dolorem eveniet impedit ipsa tempore debitis mollitia. Blanditiis molestiae laboriosam pariatur mollitia architecto quis atque facilis odio temporibus excepturi distinctio corrupti placeat repellat, necessitatibus deserunt eligendi dolorem repellendus. Molestiae error odio, qui quasi eligendi, ipsum ipsa voluptatibus iusto reprehenderit fugiat rerum repellendus magnam, suscipit laborum fugit cupiditate similique. Asperiores rem molestias officia libero quasi aperiis esse, earum, odio vitae autem est enim sint mollitia quam doloremque corporis inventore molestiae facilis ex! Temporibus placeat architecto impedit dolore vitae accusamus obcaecati officia qui painima am ducimus nostrum odit quam iusto! Quidem reiciendis sequi dolores eaque voluptate a et quod natus obcaecati provident aliquam, nam ab in quos accusamus velit fugiat possimus impedit corrupti at, vel ut! Sunt cumque amet voluptatem voluptas eaque iure, unde temporibus earum optio, molestiae numquam porro quibusdam cum explicabo? Labore, ab modi.
            </div>
        </>
    )
}

export default BodyInside