import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { useUserStore } from '@/stores/user'

const navigations = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/about',
    label: 'About'
  },
  {
    to: '/movies',
    label: 'Movies'
  },
  {
    to: '/signin',
    label: 'Log In'
  },
  {
    to: '/signup',
    label: 'Sign Up'
  }
]

export default function Header() {
  const currentUser = useUserStore(state => state.currentUser)

  return (
    <header>
      {navigations.map(nav => {
        return (
          <NavLink
            key={nav.to}
            to={nav.to}
            className={({ isActive }) => {
              return isActive ? styles.active : ''
            }}>
            {nav.label}
          </NavLink>
        )
      })}
      <div>{currentUser?.displayName}</div>
    </header>
  )
}
