import { useSearchParams, useNavigate } from 'react-router-dom'

// http://localhost:5173/signin?redirectTo=/movies
export default function SignIn() {
  const navigate = useNavigate()
  // 쿼리스트링 정보를 가져와 사용하기 쉽게 객체로 변환합니다.
  // /signin?redirectTo=/movies
  const [searchParams] = useSearchParams()
  const query = Object.fromEntries(searchParams)
  console.log(query)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // `<form>`의 새로고침(기본 동작)을 방지합니다.
    event.preventDefault()
    // `<form>`의 데이터를 가져와 사용하기 쉽게 객체로 변환합니다.
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // 로그인 정보가 모두 있으면, 임시로 로그인 처리합니다.
    if (email && password) {
      await signIn({ email, password })
      navigate(query.redirectTo || '/')
    }
  }

  async function signIn(payload: { email: string; password: string }) {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: 'KDT8_bcAWVpD8',
          username: 'KDT8_ParkYoungWoong'
        },
        body: JSON.stringify(payload)
      }
    )
    const { user, accessToken } = await res.json()
    if (user) {
      localStorage.setItem('accessToken', accessToken)
      return user
    }
    return null
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  )
}
