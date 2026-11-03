import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { client } from "../lib/neon";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data } = await client.auth.getSession();
    setUser(data?.session ? data.user : null);
    return data;
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const userId = user?.id;
  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }
    client
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [userId]);

  const value = useMemo(() => {
    const withRefresh = (call) => async (...args) => {
      const result = await call(...args);
      if (!result.error) await refresh();
      return result;
    };
    return {
      user,
      profile,
      loading,
      signIn: withRefresh((email, password) => client.auth.signIn.email({ email, password })),
      // The username is stored as the Better Auth name; a trigger turns it into the profile row.
      signUp: withRefresh((email, password, username) =>
        client.auth.signUp.email({ email, password, name: username })
      ),
      signOut: async () => {
        await client.auth.signOut();
        setUser(null);
      },
      sendReset: (email) =>
        client.auth.requestPasswordReset({ email, redirectTo: `${window.location.origin}/reset-password` }),
      resetPassword: (newPassword, token) => client.auth.resetPassword({ newPassword, token }),
    };
  }, [user, profile, loading, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
