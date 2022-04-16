import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { ActionFunction } from "remix";
import { createUserSession, clearCookie } from "~/utils/session.server";

/** Takes in an AuthChangeEvent and a supabase user session,
 * If auth change event is `SIGNED_IN`, store the session's JWT in a cookie,
 * if it is `SIGNED_OUT`, destroy the session cookie.
 */
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const authEvent = formData.get("event") as AuthChangeEvent;
  const formSession = formData.get("session");

  if (typeof formSession === "string") {
    const session = JSON.parse(formSession) as Session;
    if (authEvent === "SIGNED_IN" && session.user != null) {
      return createUserSession(session.access_token, session.user.id, "/user");
    }
    if (authEvent === "SIGNED_OUT") {
      return clearCookie(request);
    }
  }
};