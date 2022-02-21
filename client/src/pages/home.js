import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import Log from '../components/Log'
import NewPost from '../components/post/newPostForm'
import Thread from '../components/thread'

function Home() {
    const uid = useContext(UidContext)
    return (
        <div className='home'>
           <div className='main'>
               <div className='homeHeader'>
                    {
                        uid ? <NewPost/> : <Log signin={true} signup={false}/>
                    }
               </div>
                <Thread/>
           </div>
        </div>
    )
}

export default Home
