import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './router/routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { UserProvider } from './components/UserContext'


function App() {
    const user = localStorage.getItem('user');

    return (
        <div className="App">
            <NotificationContainer />

            <UserProvider value={JSON.parse(user)}>
                <BrowserRouter>
                    <Switch>
                        {routes.map((route) => {
                            const Component = route.component;
                            return (
                                <Route
                                    path={route.path}
                                    key={route.path}
                                    exact={route.exact}
                                >
                                    <Component />
                                </Route>
                            );
                        })}
                    </Switch>
                </BrowserRouter>
            </UserProvider>
        </div>
    );
}

export default App;
