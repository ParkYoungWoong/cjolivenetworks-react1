import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface User {
  email: string // 사용자 아이디
  displayName: string // 사용자 표시 이름
}

export const useUserStore = create(
  immer(
    combine(
      {
        currentUser: null as User | null,
        sampleUser: {
          name: 'Heropy',
          age: 85,
          address: {
            city: 'Seoul',
            country: 'Korea',
            emails: ['test1@test.com', 'test2@test.com']
          }
        }
      },
      set => ({
        async signIn(payload: { email: string; password: string }) {
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
            set({ currentUser: user })
          }
        },
        async signUp(payload: {
          email: string
          password: string
          displayName: string
        }) {
          const res = await fetch(
            'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
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
            set({ currentUser: user })
          }
        },
        async isAuth() {
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
          set({ currentUser: user })
          return !!user?.email
        },
        setSampleUserSecondEmail(email: string) {
          set(state => {
            const { sampleUser } = state
            sampleUser.address.emails[1] = email
            // return {
            //   sampleUser: {
            //     ...sampleUser,
            //     address: {
            //       ...sampleUser.address,
            //       emails: [sampleUser.address.emails[0], email]
            //     }
            //   }
            // }
          })
        }
      })
    )
  )
)
