import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../components/UserContext';
import ChatComponent from '../components/ChatComponent';

export const Chat = ({ props }) => {
    const user = useContext(UserContext);
    return user && user.token ? (
        <ChatComponent username={user.username}/>
    ) : (
        <Redirect
            to={{
                pathname: '/auth',
            }}
        />
    );
};
