import { useCountStore } from '@/stores/count'

export default function About() {
  const count = useCountStore(state => state.count)
  const double = useCountStore(state => state.double)
  const increase = useCountStore(state => state.increase)
  const decrease = useCountStore(state => state.decrease)

  return (
    <>
      <h1>About Page!</h1>
      <h2>{count}</h2>
      <h3>{double}</h3>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </>
  )
}
