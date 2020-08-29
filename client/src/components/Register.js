import React from 'react';
import { Form } from 'react-bootstrap';
import Button from './Button';

export function Register({ onSubmit, loading }) {
    const [form, setForm] = React.useState({});

    const handleChange = name => e => {
        const { value } = e.target;
        setForm({...form, [name]: value})
    };

    return <div>
        <Form onSubmit={onSubmit(form)} style={{ paddingTop: 30 }}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter user name" onChange={handleChange('username')} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleChange('password')} />
            </Form.Group>
            <Button text='Submit' loading={loading} />
        </Form>
    </div>;
}
