import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(window.ENV.SUPABASE_URL, window.ENV.SUPABASE_ANON_KEY, {
  fetch: (...args) => fetch(...args),
  autoRefreshToken: false,
  persistSession: true
})

export function signInWithGoogle() {
  supabaseClient.auth.signIn({
    provider: 'google'
  }, { redirectTo: "http://127.0.0.1:8787/login" })
}


/**
 * Insert to the peer table and return the peer Id
 * @param {string} userId
 * @returns {Promise<string>} peer Id
 */
export async function insertPeer(userId: string): Promise<string> {
  const { data, error } = await supabaseClient.from("peers").insert({ user_id: userId }).maybeSingle();
  if (error) {
    return 'error' + error.message;
    //window.location.href = '/login';
  }
  return data.id;
}

type SignUpForm = LoginForm

export async function login({
  email,
  password
}: LoginForm) {
  if (supabaseClient.auth.user() != null) {
    await supabaseClient.auth.signOut()
  }
  return supabaseClient.auth.signIn({ email, password })
}

type LoginForm = {
  email: string;
  password: string;
};

export async function registUser({ email, password, }: SignUpForm) {
  const { user, error: signUpError } = await supabaseClient.auth.signUp(
    { email, password },
  );
  return { user, error: signUpError };
}