import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

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
  }
]

export default function Header() {
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
    </header>
  )
}
