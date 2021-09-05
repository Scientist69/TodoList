import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebase } from './firebase';
import { Login } from './Login';
import { ProjectsProvider, SelectedProjectProvider } from './context';
import { Hero } from './Hero';

export const App = ({ darkModeDefault = false }) => {
  const [ darkMode, setDarkMode ] = useState(darkModeDefault);
  const [ user, setUser ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ hasAccount, setHasAccount ] = useState(false);

const clearInputs = () => {
  setEmail('');
  setPassword('');
}

const clearErrors = () => {
  setEmailError('');
  setPasswordError('');
}

  const handleLogin = () => {
    clearErrors();
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch( err => {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
      }
    });
  };

  const handleSignup = () => {
    clearErrors();
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch( err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
      }
    });
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();
        setUser(user);
      }
      else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <Router>
      <SelectedProjectProvider>
        <ProjectsProvider>
        <main 
          data-testid="application"
          className={darkMode ? 'darkmode' : undefined}
        >
         <Switch>
           <Route exact path="/">
           { user ? (
             <Hero />
              ) : (
              <Login 
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
              />
            )}
           </Route>
         </Switch>

        </main>
        </ProjectsProvider>
      </SelectedProjectProvider>
    </Router>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
