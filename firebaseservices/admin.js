const admin = require("firebase-admin")

const serviceAccount = require("firebaseservices/firebase-keys.json")

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://devter-67891.firebaseio.com",
  })
}

export const firestore = admin.firestore()

// import {
//   initializeApp,
//   applicationDefault,
//   getApp,
//   getApps,
// } from "firebase-admin/app"
// import { getFirestore } from "firebase/firestore"

// export const firestoreAdmin = () => {
//   const adminApp =
//     getApps().length === 0
//       ? initializeApp({
//           credential: applicationDefault(),
//           databaseURL: "https://devter-67891.firebaseio.com",
//         })
//       : getApp()

//   return getFirestore(adminApp)
// }
