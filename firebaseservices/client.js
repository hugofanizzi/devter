import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth"

import { initializeApp, getApps, getApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDvAehs-eLOW2skct15VU9Bl1Ms02319e0",
  authDomain: "devter-67891.firebaseapp.com",
  projectId: "devter-67891",
  storageBucket: "devter-67891.appspot.com",
  messagingSenderId: "459696067328",
  appId: "1:459696067328:web:e2fb34905ca12b275819e5",
}

getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const mapUserFromFirebaseAuthToUser = (user) => {
  return (
    user && {
      avatar: user?.photoURL,
      email: user?.email,
    }
  )
}

export const onAutStateChanged = (setUser) => {
  return getAuth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    setUser(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const auth = getAuth()
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider)
}
