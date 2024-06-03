import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7SZ20O6djh2NzZcDqBsi7MIWjpWrg-x4",
  authDomain: "slutprojekt-scrum-board.firebaseapp.com",
  projectId: "slutprojekt-scrum-board",
  storageBucket: "slutprojekt-scrum-board.appspot.com",
  messagingSenderId: "902046492840",
  appId: "1:902046492840:web:84b3baa8bf8caf62e03a9d",
  measurementId: "G-WQ42ZRXHKG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
