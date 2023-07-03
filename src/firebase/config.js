import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYLtyhtZaAINgwGAnuAc_y68iiNDdExvw",
  authDomain: "snap-gallery-a1447.firebaseapp.com",
  projectId: "snap-gallery-a1447",
  storageBucket: "snap-gallery-a1447.appspot.com",
  messagingSenderId: "1008378021111",
  appId: "1:1008378021111:web:d2468855e6ef1455837ff2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
