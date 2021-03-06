import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from './firebase';
import axios from 'axios';

import { useAuth } from './AuthContext';

const Chats = () => {

  const history = useHistory();
  const { user } = useAuth();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);

  
  const handleLogout = async () => {
    await auth.signOut();

    history.push('/');
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })

  }

  useEffect(() => {
    if(!user) {
      history.push('/');
      return;
    }

    axios.get('https://api.chatengine.io/users/me/', {
      headers: {
        'project-id': '', /* project id here */
        'user-name': user.email,
        'user-secret': user.uid,
      }
    })
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      let formdata = new FormData();
      formdata.append('email', user.email);
      formdata.append('username', user.email);
      formdata.append('secret', user.uid);

      getFile(user.photoURL)
         .then((avatar) => {
           formdata.append('avatar', avatar, avatar.name);

           axios.post('https://api.chatengine.io/users/',
              formdata,
              { headers: { 'private-key': '' } } /* private key here */
           )
           .then(() => setLoading(false))
           .catch((error) => console.log(error))
         })
    })



     
  }, [user, history]);

 
  if (user == null) {
    return null
  }
  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          LucChat
        </div>
          <div onClick={handleLogout} className='logout-tab'>
            Logout
          </div>
      </div>  

      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID='' */  
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
        );
}

export default Chats;
