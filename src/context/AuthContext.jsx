// context/AuthContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cracks , setCracks]= useState([]);
  const [cracksLoading , setCracksLoading] = useState(true);

  async function fetchUser() {
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
    const fetchCracks = async () => {
      try {
        const res = await fetch('/api/crack');
        if(res.ok){
          const data = await res.json();
        console.log(data)
        setCracks(data);
        }
      } catch (err) {
        console.error('Error fetching cracks:', err);
      }finally{
        setCracksLoading(false)
      }
    };

  useEffect(() => {
    fetchUser();
    fetchCracks()
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser  , cracks ,setCracks , cracksLoading}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
