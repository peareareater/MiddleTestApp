import React, { useEffect } from 'react';
import ChatInput from './ChatInput';
import { ListGroup, Form } from 'react-bootstrap';
import MessageItem from './MessageItem';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const socket = io.connect('http://localhost:8081');

export default function ChatComponent({ username }) {
    const [messages, setMessages] = React.useState([]);
    const [usersOnline, setUsers] = React.useState([]);
    const [users, setAllUsers] = React.useState([]);
    const [sorting, setSorting] = React.useState({
        online: false,
        name: 'asc',
    });

    useEffect(() => {
        socket.on('chat message', ({ name, message }) => {
            if (name !== username) {
                addMessage({ name, message });
            }
        });
        socket.on('clients', (clients) => {
            setUsers(clients);
        });
        socket.on('allClients', (clients) => {
            setAllUsers(clients);
        });
        socket.on('messages', (messages) => {
            console.log(messages);
            setMessages(messages);
        });

        socket.on('send-nickname', () => {
            socket.emit('send-nickname', username);
        });
    }, []);

    const addMessage = (message) => {
        setMessages((messages) => {
            const newMessages = [...messages];
            newMessages.push(message);
            return newMessages;
        });
    };
    const submitMessage = (messageString) => {
        const message = { name: username, message: messageString };
        socket.emit('chat message', message);
        addMessage(message);
    };

    const setStatusSortingByOnline = () =>
        setSorting({ ...sorting, online: !sorting.online });

    return (
        <div style={{ height: '100%', display: 'flex' }}>
            <div style={{ height: '100%', width: '70%' }}>
                <ListGroup style={{ height: '80%' }}>
                    {messages.map((message, index) => {
                        return (
                            <MessageItem
                                key={`message-${index}`}
                                message={message}
                                username={username}
                            />
                        );
                    })}
                </ListGroup>

                <label htmlFor="name">
                    <span>{username}</span>
                </label>
                <ChatInput
                    onSubmitMessage={(messageString) =>
                        submitMessage(messageString)
                    }
                />
            </div>
            <div style={{ width: '30%' }}>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Online/Offline"
                                onClick={setStatusSortingByOnline}
                            />
                        </Form>
                        <FontAwesomeIcon
                            icon={faSort}
                            fontSize={20}
                            onClick={() => {
                                console.log(sorting.name);
                                setSorting({
                                    ...sorting,
                                    name:
                                        sorting.name === 'asc' ? 'desc' : 'asc',
                                });
                            }}
                        />
                    </div>
                </div>
                <ListGroup style={{ height: '80%' }}>
                    {users
                        .sort((a, b) => {
                            if (a.username > b.username) {
                                return sorting.name === 'desc' ? 1 : -1;
                            } else {
                                return sorting.name === 'desc' ? -1 : 1;
                            }
                        })
                        .map((user, index) => {
                            return sorting.online ? (
                                usersOnline.find(
                                    (_user) => _user.username === user.username
                                ) && (
                                    <ListGroup.Item key={`user-${index}`}>
                                        {user.username}
                                    </ListGroup.Item>
                                )
                            ) : (
                                <ListGroup.Item key={`user-${index}`}>
                                    {user.username}
                                </ListGroup.Item>
                            );
                        })}
                </ListGroup>
            </div>
        </div>
    );
}
