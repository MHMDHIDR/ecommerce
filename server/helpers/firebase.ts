import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIK_EY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
