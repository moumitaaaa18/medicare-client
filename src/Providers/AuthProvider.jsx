import { createContext, useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (name, email, password, photo) => {
    setLoading(true);

    const result = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
    });

    await checkSession();
    return result;
  };

  const loginUser = async (email, password) => {
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
    });

    await checkSession();
    return result;
  };

  const logoutUser = async () => {
    setLoading(true);
    await authClient.signOut();
    setUser(null);
    setLoading(false);
  };

  const googleLogin = async () => {
    return authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const checkSession = async () => {
    try {
      const session = await authClient.getSession();
      setUser(session?.data?.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
  const refreshUser = async () => {
  await checkSession();
};

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logoutUser,
    googleLogin,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;