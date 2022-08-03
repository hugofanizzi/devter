import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq_psSO_sB1LnEybGt4Ca2TSZjrijjHMA",
  authDomain: "devter-c5f61.firebaseapp.com",
  projectId: "devter-c5f61",
  storageBucket: "devter-c5f61.appspot.com",
  messagingSenderId: "941284686886",
  appId: "1:941284686886:web:b27ab127bad2440a253ae7",
  measurementId: "G-TR4ZCD9WTG",
};

const app = initializeApp(firebaseConfig);

export const loginWithGitHub = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
};
