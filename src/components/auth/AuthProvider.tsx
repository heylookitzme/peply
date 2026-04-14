"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

type AuthContextValue = {
  user: User | null;
  displayName: string | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  displayName: null,
  loading: true,
  refreshProfile: async () => {},
});

export function AuthProvider({
  initialUser = null,
  initialDisplayName = null,
  children,
}: {
  initialUser?: User | null;
  initialDisplayName?: string | null;
  children: React.ReactNode;
}): React.ReactElement {
  const [user, setUser] = useState<User | null>(initialUser);
  const [displayName, setDisplayName] = useState<string | null>(
    initialDisplayName,
  );
  const [loading, setLoading] = useState<boolean>(initialUser === null);

  const fetchDisplayName = useCallback(async (userId: string) => {
    const supabase = createClient();
    const { data } = await supabase
      .from("user_profiles")
      .select("display_name")
      .eq("id", userId)
      .maybeSingle<{ display_name: string | null }>();
    setDisplayName(data?.display_name ?? null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    await fetchDisplayName(user.id);
  }, [user, fetchDisplayName]);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      setUser(data.user ?? null);
      setLoading(false);
      if (data.user && initialDisplayName === null) {
        void fetchDisplayName(data.user.id);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const next = session?.user ?? null;
      setUser(next);
      setLoading(false);
      if (next) {
        void fetchDisplayName(next.id);
      } else {
        setDisplayName(null);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [fetchDisplayName, initialDisplayName]);

  const value = useMemo(
    () => ({ user, displayName, loading, refreshProfile }),
    [user, displayName, loading, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
