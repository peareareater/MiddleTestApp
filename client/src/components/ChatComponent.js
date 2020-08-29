import React, { useEffect } from 'react';
import ChatInput from './ChatInput';
import { ListGroup } from 'react-bootstrap';
import MessageItem from './MessageItem';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8081");

export default function ChatComponent({ username }) {
    const [messages, setMessages] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        socket.on("chat message", ({ name, message }) => {
            if(name !== username) {
                addMessage({ name, message });
            }
        });
        socket.on("clients", (clients) => {
            console.log(clients, 'QWEQWE');
            setUsers(clients);
        });
        socket.on("messages", (messages) => {
            console.log(messages);
            setMessages(messages);
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
        socket.emit("chat message", message);
        addMessage(message);
    };

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
                <ListGroup style={{ height: '80%' }}>
                    {users.map((user, index) => {
                        return (
                            <ListGroup.Item key={`user-${index}`}>
                                {user}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
}
