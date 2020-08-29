import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import client from 'axios';
import { apiUrl } from '../helpers/client';
import { NotificationManager} from 'react-notifications';
import { withRouter } from 'react-router';
import UserContext from '../components/UserContext';

const tabs = {
    login: Login,
    register: Register,
};

function Auth({ history }) {
    const [tab, changeTab] = useState('login');
    const context = React.useContext(UserContext);
    console.log(context, 'ASDASD');
    const [loading, setLoading] = useState(false);
    const Component = tabs[tab];

    const handleSuccess = (user) => {
        NotificationManager.success('Success');
        if(tab === 'login') {
            localStorage.setItem('user', JSON.stringify(user));
            setTimeout(() => {
                history.push('/chat');
            }, 1000);
        } else {
            changeTab('login');
        }
    };
    const onSubmit = (value) => async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const result = await client.post(`${apiUrl}/user/${tab}`, value);
            handleSuccess(result.data);
        } catch (e) {
            NotificationManager.error(e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-form">
            <Nav fill variant="tabs">
                {['login', 'register'].map((item) => {
                    return (
                        <Nav.Item key={item} onClick={() => changeTab(item)}>
                            <Nav.Link>{item}</Nav.Link>
                        </Nav.Item>
                    );
                })}
            </Nav>
            <Component onSubmit={onSubmit} loading={loading} />
        </div>
    );
}
export default withRouter(Auth);