import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        const ref = doc(db, "users", user.uid);
        const docSnap = await getDoc(ref);
        setUser(docSnap.data());
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
