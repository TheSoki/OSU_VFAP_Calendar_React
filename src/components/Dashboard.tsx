import { useEffect, useState } from 'react'
import { Permission, User, client } from '../router'
import { pushNotification } from '../utils/notifications'

export const Dashboard = () => {
    const [user, setUser] = useState<
        | (User & {
              permissions: Permission[]
          })
        | null
    >(null)

    useEffect(() => {
        console.log('fetching user')
        const fetchMe = async () => {
            const user = await client('/auth/me', 'GET')
            setUser(user)
        }
        fetchMe()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            pushNotification({
                message:
                    'This is a success notification. It will disappear in 5 seconds.',
                type: 'SUCCESS',
            })
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="mt-4">
                <h2 className="text-xl font-bold">User</h2>
                <div className="mt-2">
                    <div className="flex items-center">
                        <div className="w-1/3">Name</div>
                        <div className="w-2/3">{user.name}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/3">Email</div>
                        <div className="w-2/3">{user.email}</div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Permissions</h2>
                <div className="mt-2">
                    {user.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center">
                            <div className="w-1/3">{permission.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
