import { initializeApp } from "firebase/app";
import { getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBM_mGdx4vY5REii49td5jRsfPd9yacv70",
  authDomain: "social-media-app-38d89.firebaseapp.com",
  projectId: "social-media-app-38d89",
  storageBucket: "social-media-app-38d89.appspot.com",
  messagingSenderId: "967995255356",
  appId: "1:967995255356:web:ebb40ea1c2f512d8dcb139",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function useDocumentData(query) {
  const docSnap = await getDoc(query);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function useCollectionData(query) {
  const querySnapshot = await getDocs(query);

  if (!querySnapshot.empty) {
    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), docId: doc.id };
    });
    return data;
  } else {
    return [];
  }
}
