import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const COOKIE = 'sk_token'

function secret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || 'serverkit-dev-secret-please-change-in-production'
  )
}

export async function signToken() {
  return new SignJWT({ sub: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret())
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload
  } catch {
    return null
  }
}

export async function getSession() {
  const store = await cookies()
  const token = store.get(COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}
