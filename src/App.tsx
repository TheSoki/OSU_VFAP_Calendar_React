import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Index } from './components'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { Dashboard } from './components/Dashboard'
import { Layout } from './components/routes/Layout'
import { SnackbarLayout } from './components/SnackbarLayout'

const App = () => (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <SnackbarLayout>
                                <Dashboard />
                            </SnackbarLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/create"
                    element={
                        <ProtectedRoute>
                            <SnackbarLayout>
                                <Dashboard />
                            </SnackbarLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
        </Layout>
    </BrowserRouter>
)

export default App
