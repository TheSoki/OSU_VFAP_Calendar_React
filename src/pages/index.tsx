import { useEffect } from 'react'
import { client } from '../router'

export const Index = () => {
    useEffect(() => {
        const login = async () => {
            const login = await client('/auth/login', 'POST', {
                email: 'admin@test.com',
                password: 'password',
            })
            console.log(login)

            localStorage.setItem('accessToken', login.accessToken)
            localStorage.setItem('refreshToken', login.refreshToken)

            console.log(await client('/user', 'GET'))

            console.log(await client('/auth/me', 'GET'))
        }

        login()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <h1>Index</h1>
        </div>
    )
}
