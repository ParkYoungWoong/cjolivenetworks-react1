import styles from './Modal.module.css'
import { useNavigate } from 'react-router-dom'

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  function offModal() {
    navigate(-1)
  }

  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={offModal}></div>
      <div className={styles.content}>
        <button onClick={offModal}>닫기</button>
        {children}
      </div>
    </div>
  )
}
