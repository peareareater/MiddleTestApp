import Auth from '../pages/Auth';
import { Chat } from '../pages/Chat';
import { Redirect } from 'react-router';
import React from 'react';

export const routes = [
    {
        path: '/',
        exact: true,
        component: () => (
            <Redirect
                to={{
                    pathname: '/chat',
                }}
            />
        ),
    },
    { path: '/auth', exact: true, component: Auth },
    { path: '/chat', exact: true, component: Chat },
];
