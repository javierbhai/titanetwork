import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import Home from './pages/Home';
import Login from './pages/Login';

import './styles/styles.css'

const App = () => {
  //Saving the user just for testing - I would use Redux or a any preserving method
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    setIsLoggedin(true)
  };

  const handleSignOut = () => {
    setUser({});
    setIsLoggedin(false)
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: '222024277413-t4uh6p7q9hvbegcqj8kf5uto6b9cd5q0.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();

  }, []);

  return (
    <>
      {
        Object.keys(user).length !== 0 &&
        <Home
          user={user}
          onLogout={handleSignOut}
        />
      }
      <Login isLoggedin={isLoggedin} />
    </>
  );
}

export default App;
