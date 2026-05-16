import { useEffect, useState } from "react";
import type {
  Session,
  User,
} from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] =
    useState<Session | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        setSession(data.session);

        setUser(
          data.session?.user ?? null
        );

        // cek admin
        if (data.session?.user) {
          const { data: roleData } =
            await supabase
              .from("user_roles")
              .select("role")
              .eq(
                "user_id",
                data.session.user.id
              )
              .eq("role", "admin")
              .maybeSingle();

          setIsAdmin(!!roleData);
        }

        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        setUser(
          session?.user ?? null
        );

        // cek admin realtime
        if (session?.user) {
          const { data: roleData } =
            await supabase
              .from("user_roles")
              .select("role")
              .eq(
                "user_id",
                session.user.id
              )
              .eq("role", "admin")
              .maybeSingle();

          setIsAdmin(!!roleData);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "/";
  }

  return {
    session,
    user,
    isAdmin,
    loading,
    signOut,
  };
}