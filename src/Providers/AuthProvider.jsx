import { createContext, useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveJwtToken = async (email) => {
    if (!email) return;

    const tokenRes = await fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData?.token) {
      localStorage.setItem("access-token", tokenData.token);
    }
  };

  const saveUserToDatabase = async (currentUser) => {
    if (!currentUser?.email) return;

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: currentUser.name || currentUser.email,
        email: currentUser.email,
        photo: currentUser.image || "https://i.ibb.co/4pDNDk1/avatar.png",
        role: "patient",
        status: "active",
        verificationStatus: "verified",
      }),
    });
  };

  const checkSession = async () => {
    try {
      const session = await authClient.getSession();
      const currentUser = session?.data?.user || null;

      setUser(currentUser);

      if (currentUser?.email) {
        await saveUserToDatabase(currentUser);
        await saveJwtToken(currentUser.email);
      }
    } catch (error) {
      setUser(null);
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

    await checkSession();

    if (!result?.error && email) {
      await saveJwtToken(email);
    }

    return result;
  };

  const loginUser = async (email, password) => {
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
    });

    await checkSession();

    if (!result?.error && email) {
      await saveJwtToken(email);
    }

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