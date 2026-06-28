import { createContext, useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveJwtToken = async (email) => {
    if (!email) return;

    const tokenRes = await fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData?.token) {
      localStorage.setItem("access-token", tokenData.token);
    }
  };

  const checkSession = async () => {
    try {
      const session = await authClient.getSession();
      const currentUser = session?.data?.user || null;

      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));

        if (currentUser.email) {
          await saveJwtToken(currentUser.email);
        }
      } else {
        const savedUser = localStorage.getItem("user");
        setUser(savedUser ? JSON.parse(savedUser) : null);
      }
    } catch {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (name, email, password, photo) => {
    setLoading(true);

    const result = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
    });

    if (result?.error) {
      setLoading(false);
      return result;
    }

    const createdUser = result?.data?.user || { name, email, image: photo };

    setUser(createdUser);
    localStorage.setItem("user", JSON.stringify(createdUser));

    await saveJwtToken(email);

    setLoading(false);
    return result;
  };

  const loginUser = async (email, password) => {
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
    });

    if (result?.error) {
      setLoading(false);
      return result;
    }

    const loggedUser = result?.data?.user || { email };

    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    await saveJwtToken(email);

    setLoading(false);
    return result;
  };

  const googleLogin = async () => {
    return authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const logoutUser = async () => {
    setLoading(true);

    await authClient.signOut();

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");

    setLoading(false);
  };

  const refreshUser = async () => {
    await checkSession();
  };

  useEffect(() => {
    checkSession();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;