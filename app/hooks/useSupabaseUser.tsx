import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useFetcher } from "remix";
import { supabaseClient } from "~/utils/session.client";

type UserContextType = {
  user: User | null;
  session: Session | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * sessionとuserのコンテキストを提供する
 * また、authの状態が変化した際に/authにSupabaseからのsessionをPOSTする
 * @param {{ children: ReactChild }} { children }
 */
export const UserContextProvider = ({ children }: { children: ReactChild }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const fetcher = useFetcher();

  const fetchSessionCookie = useCallback(
    (event: AuthChangeEvent, session: Session | null) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT")
        fetcher.submit(
          { event, session: JSON.stringify(session) },
          { action: "/auth", method: "post" }
        );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    //If auth state changes while user is in the app, set session/auth to new values
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        fetchSessionCookie(event, session);
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [fetchSessionCookie]);

  useEffect(() => {
    if (window.ENV.ENVIRONMENT === "dev") {
      return;
    }
    // On initial load, recover session from local storage and store in state
    const session = supabaseClient.auth.session();
    setSession(session);
    setUser(session?.user ?? null);

    // If session exists by now, set a cookie when app is reloaded, in case session was expired while app wasn't open
    // because session recovering/refreshing now happens on supabase constructor, before any onAuthStateChange events are emitted.
    if (session) fetchSessionCookie("SIGNED_IN", session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: UserContextType = { user, session };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * Gets user/session details stored in UserContext
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
