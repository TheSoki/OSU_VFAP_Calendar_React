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
        <div>
            <h1>Index</h1>
        </div>
    )
}
