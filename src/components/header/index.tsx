'use client';

import React, { useContext } from 'react';

import AuthContext from '@/contexts/authContext';
import useAuthRouter from '@/hooks/useAuthRouter';
import AuthType from '@/types/auth-type-enum';

function Header() {
  const { meProfile, logout } = useContext(AuthContext);
  const authRouter = useAuthRouter();

  return (
    <div>
      THIS IS HEADER: {meProfile?.email}
      <div>
        {!meProfile ? (
          <button
            onClick={() => {
              authRouter(AuthType.LOGIN);
            }}
          >
            LOGIN
          </button>
        ) : (
          <button onClick={() => logout()}>LOGOUT</button>
        )}
      </div>
    </div>
  );
}

export default Header;
