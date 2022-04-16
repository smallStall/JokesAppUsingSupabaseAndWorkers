import { createCloudflareKVSessionStorage, redirect, json } from "remix";
import { db } from "./db.server";
import { signHmac } from "~/utils/crypto.server";
import { PeerCredential } from "skyway-js"

export type SkywaySign = {
  credential: PeerCredential;
  peerId: string;
}

export type IdToken = {
  userId: string
  accessToken: string
}

const storage =
  createCloudflareKVSessionStorage({
    cookie: {
      name: "RJ_session",
      secure: ENVIRONMENT !== 'dev',//開発時はSafariでうまくいかないためfalseにする
      secrets: [SESSION_SECRET],
      sameSite: "lax",
      path: "/",
      //expires: new Date(Date.now() + 3600_000),
      maxAge: 604700, //1週間
      httpOnly: true,
    },
    kv: JOKES_SESSION_STORAGE,
  });


function getServerCookie(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function requireUserToken(request: Request): Promise<Response | IdToken> {
  const session = await getServerCookie(request);
  const accessToken = await session.get("accessToken");
  const user = await db.auth.api.getUser(accessToken);

  if (!accessToken || !user || !user.data) {
    throw redirect("/login", 401);
  }
  return { userId: user.data.id, accessToken: accessToken };
}

export async function logout(request: Request) {
  const session = await getServerCookie(request);
  if (!session) { return redirect("/login") }
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}


/**
 * Create a cookie with that stores the provided `accessToken`
 * @param accessToken The user's JWT, stored in the user's session
 * @returns Response that sets cookie
 */
export async function createUserSession(accessToken: string, userId: string, redirectTo: string) {
  // Get/create a cookie from the cookie store
  const session = await storage.getSession();

  //Set the accessToken property in the cookie
  session.set("accessToken", accessToken);
  session.set("userId", userId);

  //Return the response that sets the cookie in the client
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

/**
 * skywayのcredentialを発行する
 * @param {Request} request クライアントから送られるリクエスト
 * @param {string} redirectTo 成功したときのリダイレクト先
 * @returns {(Promise<Response | void>)} credentialがヘッダーに格納されたレスポンス
 */
export async function signSkyway(request: Request, redirectTo: string): Promise<Response | void> {
  const session = await getServerCookie(request);
  const formData = await request.formData();
  const peerId = formData.get("peerId");
  if (peerId === "undefined" || typeof (peerId) !== "string") {
    return;
  }
  if (!session.has("accessToken")) {
    return;
  }
  session.set("peerId", peerId);
  const credentialTtl = 25 * 60; //25分
  const timestamp = Math.floor(Date.now() / 1000);
  const credential = {
    timestamp: timestamp,
    ttl: credentialTtl,
    authToken: await signHmac(`${timestamp}:${credentialTtl}:${peerId}`)
  }
  session.set("credential", JSON.stringify(credential));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}


/**
 * skywayのサインを取得して返す
 * @param {Request} request
 * @param {string} redirectTo リダイレクト先
 * @returns {Promise<SkywaySign>} Skywayのサイン
 */
export async function getSkywaySign(request: Request, redirectTo: string): Promise<SkywaySign | Response> {
  const session = await getServerCookie(request);
  const credential = session.get("credential");
  const peerId = session.get("peerId");
  if (typeof peerId !== "string" || typeof credential != "string") {
    return redirect(redirectTo);
  }
  const sign: SkywaySign = {
    "credential": JSON.parse(credential),
    "peerId": peerId
  }

  return sign
}

/** Destroy the session cookie  */
export async function clearCookie(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  if (session == null) {
    return redirect("/login")
  } else {
    return json("/", {
      headers: {
        "Set-Cookie": await storage.destroySession(session),
      },
    });
  }
}