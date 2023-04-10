import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Index } from './components'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { Dashboard } from './components/Dashboard'
import { Layout } from './components/routes/Layout'
import { SnackbarLayout } from './components/SnackbarLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Create } from './components/Create'
import { Detail } from './components/Detail'
import { Edit } from './components/Edit'

const queryClient = new QueryClient()

const App = () => (
    <QueryClientProvider client={queryClient}>
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
                                    <Create />
                                </SnackbarLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/dashboard/event/:id"
                        element={
                            <ProtectedRoute>
                                <SnackbarLayout>
                                    <Detail />
                                </SnackbarLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/dashboard/event/:id/edit"
                        element={
                            <ProtectedRoute>
                                <SnackbarLayout>
                                    <Edit />
                                </SnackbarLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/*" element={<Navigate replace to="/" />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </QueryClientProvider>
)

export default App
