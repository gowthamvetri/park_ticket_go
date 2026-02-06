import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    () => localStorage.getItem("token") !== null
  )
  const [role, setRole] = useState("")

  const login = ({ token }) => {
    localStorage.setItem("token", token)
    setIsAuth(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuth(false)
    setRole("")
  }

  useEffect(() => {
    if (!isAuth) return

    const getRole = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/getRole",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        setRole(res.data.data)
      } catch (err) {
        console.error(err)
        logout()
      }
    }

    getRole()
  }, [isAuth])

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
