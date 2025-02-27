import { create } from 'zustand'
import {
  combine,
  subscribeWithSelector,
  persist,
  devtools
} from 'zustand/middleware'

export const useCountStore = create(
  persist(
    devtools(
      subscribeWithSelector(
        combine(
          {
            count: 0,
            double: 0 // count * 2
          },
          (set, get) => {
            return {
              increase: () => {
                set(state => ({
                  count: state.count + 1
                }))
              },
              decrease: () => {
                const { count } = get()
                set({
                  count: count - 1
                })
              }
            }
          }
        )
      )
    ),
    {
      name: 'countStore',
      // storage: createJSONStorage(() => sessionStorage),
      // partialize: (state) => ({
      //   count: state.count
      //
      version: 0
    }
  )
)

export const unsubscribe = useCountStore.subscribe(
  state => state.count, // 선택자
  count => {
    useCountStore.setState({
      double: count * 2
    })
  } // 핸들러
)

// document.body.addEventListener('click', () => {
//   console.log('Clicked Body!')
// })

// 스토어
// 1. 상태
// 2. 액션
// 3. 계산된 상태
