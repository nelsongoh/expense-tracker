import { useState, useEffect } from 'react';
import AuthContext from './context';
import { firebaseApp } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FullScreenSpinner from '../../components/Spinner';

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState(undefined);
  // This state is only set to true for the first time, i.e. When the page loads for the first time
  // This is required to display a loading state while we verify the user's authentication the first
  // time this application
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth(firebaseApp);
  auth.useDeviceLanguage();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
      } else {
        setUserState(null);
      }
      
      // Regardless of the user's authentication status, we disable the spinner
      // since we already have the authentication status
      if (isLoading) {
        setIsLoading(false);
      }
    });

    return () => { unsub(); }
  }, [auth, isLoading]);

  return (
    <AuthContext.Provider value={userState}>
      {isLoading ? <FullScreenSpinner isActive={isLoading}/> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;