import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth"
import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getFirestore,
  Timestamp,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDvAehs-eLOW2skct15VU9Bl1Ms02319e0",
  authDomain: "devter-67891.firebaseapp.com",
  projectId: "devter-67891",
  storageBucket: "devter-67891.appspot.com",
  messagingSenderId: "459696067328",
  appId: "1:459696067328:web:e2fb34905ca12b275819e5",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (user) => {
  const profileInfo = user.providerData[0]
  return (
    user && {
      avatar: profileInfo?.photoURL,
      email: profileInfo?.email,
      userName: profileInfo?.displayName,
      uid: profileInfo?.uid,
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

export const addDevit = ({ avatar, content, userId, userName }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fechLatestDevits = () => {
  return getDocs(collection(db, "devits")).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const date = new Date(createdAt.seconds * 1000)
      const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date)

      return {
        ...data,
        id,
        createdAt: normalizedCreatedAt,
      }
    })
  })
}
