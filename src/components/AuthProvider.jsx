
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../slices/authSlice'
import api from '../api/axios'

export default function AuthProvider({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await api.get('/auth/me')
        if (data.success) dispatch(setUser(data.user))
      } catch {
        // not logged in, do nothing
      }
    }
    restoreSession()
  }, [])

  return children
}