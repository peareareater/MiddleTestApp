import React from 'react';
import { Form } from 'react-bootstrap';
import Button from './Button';

export default function ChatInput({ onSubmitMessage }) {
    const [message, setMessage] = React.useState('');
    return (
        <Form
            onSubmit={e => {
                e.preventDefault();
                setMessage('')
                onSubmitMessage(message);
            }}
        >
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder={'Enter message...'}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
            </Form.Group>
            <Button text='Submit' loading={false} />
        </Form>
    )
}