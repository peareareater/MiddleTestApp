import { Button, Spinner } from 'react-bootstrap';
import React from 'react';

export default function _Button({ loading, text }) {
    return loading ? (
        <Spinner animation="border" />
    ) : (
        <Button variant="primary" type="submit">
            {text}
        </Button>
    );
}
