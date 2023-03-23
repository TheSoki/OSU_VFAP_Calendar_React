import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello world!</div>,
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
