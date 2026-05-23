import { initializeApp } from 'firebase/app'

import {
  getAuth
} from 'firebase/auth'

import {
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAn0w4RjUbbLYjLz16BYDuvFgFPRJiXbv8",
  authDomain: "miguelcode-d7c77.firebaseapp.com",
  projectId: "miguelcode-d7c77",
  storageBucket: "miguelcode-d7c77.firebasestorage.app",
  messagingSenderId: "318047082443",
  appId: "1:318047082443:web:a736eccbdca8f52a1d084e",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)