import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function MessageItem({ username, message }) {
    const isMe = message.name === username;

    return (
        <ListGroup.Item
            style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
            }}
        >
            <div
                style={{
                    minHeight: 50,
                    minWidth: 150,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    background: isMe ? '#d2d2ea' : '#8b8bfb',
                }}
            >
                {!isMe && <div>{message.name}</div>}
                <div>{message.message}</div>
            </div>
        </ListGroup.Item>
    );
}
