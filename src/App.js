import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import LeftDrawer from './components/drawer/LeftDrawer';
import store from './config/store';
import LoginForm from './pages/login/LoginForm';

function App() {

  /*
  * Check if user is already logged in then land to Drawer component, otherwise show login page.
  */
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const onLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {
            isAuthenticated ? <LeftDrawer /> : <LoginForm onLoginSuccess={onLogin} />
          }
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
