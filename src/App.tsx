import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Index } from './components'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { OpenRoute } from './components/routes/OpenRoute'
import { ProtectedRoute } from './components/routes/ProtectedRoute'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <OpenRoute>
                        <Index />
                    </OpenRoute>
                }
            />

            <Route
                path="/login"
                element={
                    <OpenRoute>
                        <Login />
                    </OpenRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <OpenRoute>
                        <Register />
                    </OpenRoute>
                }
            />

            <Route
                path="/dashboard"
                element={<ProtectedRoute>dashboard</ProtectedRoute>}
            />

            <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
    </BrowserRouter>
)

export default App
