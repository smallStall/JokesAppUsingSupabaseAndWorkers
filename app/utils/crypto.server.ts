async function importKey() {
  return await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SKYWAY_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function signHmac(message: string) {
  const key = await importKey()
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(message),
  )
  //https://developers.cloudflare.com/workers/runtime-apis/web-standards/#web-global-apis
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
}