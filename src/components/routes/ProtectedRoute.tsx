import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute: FC<{
    children: ReactNode
}> = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
        return <Navigate replace to="/login" />
    }

    return <>{children}</>
}
