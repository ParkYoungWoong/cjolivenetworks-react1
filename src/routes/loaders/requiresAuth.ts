import { redirect, LoaderFunctionArgs } from 'react-router-dom'
import { useUserStore } from '@/stores/user'

export async function requiresAuth({ request }: LoaderFunctionArgs) {
  const { isAuth } = useUserStore.getState()
  // request.url === 'http://localhost:5173/movies'
  // new URL(request.url).pathname === '/movies'
  const redirectTo = new URL(request.url).pathname

  if (await isAuth()) {
    return true
  }
  return redirect(`/signin?redirectTo=${redirectTo}`)
}
