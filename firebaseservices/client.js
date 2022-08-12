import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth"
import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getFirestore,
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

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
  const profileInfo = user && user.providerData[0]
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

export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    userId,
    img,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fechLatestDevits = () => {
  return getDocs(
    query(collection(db, "devits"), orderBy("createdAt", "desc"))
  ).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      return {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
    })
  })
}

export const uploadImage = (file) => {
  const storage = getStorage(app)
  const refImage = ref(storage, `image/${file.name}`)
  const task = uploadBytesResumable(refImage, file)
  return task
}
