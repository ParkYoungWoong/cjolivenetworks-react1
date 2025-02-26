import { redirect, LoaderFunctionArgs } from 'react-router-dom'

async function isAuth() {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return false
  }
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: 'KDT8_bcAWVpD8',
        username: 'KDT8_ParkYoungWoong',
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
  const user = await res.json()
  return !!user?.email
}

export async function requiresAuth({ request }: LoaderFunctionArgs) {
  // request.url === 'http://localhost:5173/movies'
  // new URL(request.url).pathname === '/movies'
  const redirectTo = new URL(request.url).pathname

  if (await isAuth()) {
    return true
  }
  return redirect(`/signin?redirectTo=${redirectTo}`)
}
