import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://medicare-server-w2xv.onrender.com",
});