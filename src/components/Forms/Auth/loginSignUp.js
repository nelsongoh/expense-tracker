import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth"
import { firebaseAuth } from "../../../firebase";

const loginSignUp = async () => {
  const provider = new GoogleAuthProvider();
  const auth = firebaseAuth;
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