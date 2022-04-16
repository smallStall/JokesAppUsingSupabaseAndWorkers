export {};

declare global {
  type DevEnvironment = "dev" | "staging" | "production"
  const ENVIRONMENT: DevEnvironment;
  const SUPABASE_ANON_KEY: string;
  const SUPABASE_URL: string;
  const SUPABASE_SERVICE_ROLE: string;
  const SESSION_SECRET: string;
  const SKYWAY_SECRET: string;
  const PEER_SECRET: string;
  const SKYWAY_APIKEY: string;
  const JOKES_SESSION_STORAGE: KVNamespace;
  interface Window{
    ENV:{
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
      SKYWAY_APIKEY: string;
      ENVIRONMENT: DevEnvironment;
    }
  }
}
