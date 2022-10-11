import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth"
import firebaseApp from "../../../firebase";

const loginSignUp = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);
  auth.useDeviceLanguage();

  await signInWithRedirect(auth, provider);
  
  const loginSignUpResult = {
    user: null,
    errorMsg: "",
  };

  try {
    const result = await getRedirectResult(auth);

    if (result) {
      loginSignUpResult.user = result.user;
    } 
  } catch(error) {
    loginSignUpResult.errorMsg = error.message;
  }

  return loginSignUpResult;  
}

export default loginSignUp;