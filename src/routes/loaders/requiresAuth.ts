import { redirect } from 'react-router-dom'

async function isAuth() {
  const accessToken = localStorage.getItem('access_token')
  // if (!accessToken) {
  //   return false
  // }
  // return true
  return !!accessToken
}

export async function requiresAuth() {
  if (await isAuth()) {
    return true
  }
  return redirect('/signin')
}
