import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Index } from './pages'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
