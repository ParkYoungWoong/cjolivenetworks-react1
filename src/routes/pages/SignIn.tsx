import { useSearchParams, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/user'

// http://localhost:5173/signin?redirectTo=/movies
export default function SignIn() {
  const signIn = useUserStore(state => state.signIn)
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
