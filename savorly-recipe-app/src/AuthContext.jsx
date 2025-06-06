import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useContext } from "react";


export const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Call this to log in (when the user submits Login form)
  const login = async ({ email, password, firebaseUser }) => {
    try {
      let uid, idToken;

      // Already have a Google firebase account or classic email/password
      if (firebaseUser) {
        uid = firebaseUser.uid;
        idToken = await firebaseUser.getIdToken(true);
      } else {
        const res = await axios.post("/auth/login", { email, password });
        idToken = res.data.idToken;
        uid = res.data.uid;
      }

      localStorage.setItem("idToken", idToken);
      localStorage.setItem("uid", uid);

      axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;

      // Fetch the Firestore "users/{uid}" doc
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        console.warn("No user doc found for UID:", uid);
        setUser(null);
        return;
      }
      const userData = userSnap.data();
      setUser({ uid, ...userData });
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // Call this to log out
  const logout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("uid");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // On mount, if there's a valid token in localStorage, restore user
  useEffect(() => {
    async function restoreUser() {
      const token = localStorage.getItem("idToken");
      if (!token) {
        setLoading(false);
        return;
      }

      // Set axios header so getDoc can use the token if needed
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const savedUid = localStorage.getItem("uid");
      if (!savedUid) {
        logout();
        setLoading(false);
        return;
      }

      try {
        // Fetch Firestore doc again
        const userDocRef = doc(db, "users", savedUid);
        const userSnap = await getDoc(userDocRef);
        if (!userSnap.exists()) {
          logout();
          setLoading(false);
          return;
        }
        const userData = userSnap.data();
        setUser({ uid: savedUid, ...userData });
      } catch (err) {
        console.error("Error restoring user:", err);
        logout();
      } finally {
        setLoading(false);
      }
    }

    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
