'use client';

import { GoogleLogin } from '@react-oauth/google';
import React, { useContext } from 'react';

import AuthContext from '@/contexts/authContext';
import storage from '@/libs/local-storage';

function Header() {
  const { isAuthorized, login, logout, meProfile } = useContext(AuthContext);

  const handleLogin = () => {};

  return (
    <div>
      THIS IS HEADER:{' '}
      {isAuthorized ? (
        <div>
          Hello, {meProfile?.firstName}{' '}
          <button
            onClick={() => {
              logout(storage.getItem('token')!);
            }}
            className='bg-red-300'
          >
            Log out
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) =>
            console.log(credentialResponse.credential)
          }
          onError={() => console.log('ERROR')}
          shape='pill'
        />
      )}
    </div>
  );
}

export default Header;
