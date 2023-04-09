import { initUntypeable, createTypeLevelClient } from 'untypeable'
import {
    registerSchema,
    loginSchema,
    userSchema,
    noteSchema,
    eventSchema,
    updateUserSchema,
    permissionSchema,
    tokensSchema,
} from './schema'
import { Tokens, User, Note, Permission } from './types'

const u = initUntypeable().pushArg<'GET' | 'POST' | 'PUT' | 'DELETE'>()

// access and refresh token are consumed from the request header via "Authorization": "Bearer <token>"
const router = u.router({
    '/auth/logout': {
        GET: u.output<void>(),
    },
    '/auth/refresh': {
        GET: u.output<Tokens>(),
    },
    '/auth/register': {
        POST: u.input(registerSchema).output<Tokens>(),
    },
    '/auth/login': {
        POST: u.input(loginSchema).output<Tokens>(),
    },
    '/auth/me': {
        GET: u.output<
            User & {
                permissions: Permission[]
            }
        >(),
    },
    '/user': {
        GET: u.output<User[]>(),
        POST: u.input(userSchema).output<User>(),
    },
    '/user/:id': {
        GET: u.output<User>(),
        PUT: u.input(updateUserSchema).output<User>(),
        DELETE: u.output<User>(),
    },
    '/note': {
        GET: u.output<Note[]>(),
        POST: u.input(noteSchema).output<Note>(),
    },
    '/note/:id': {
        GET: u.output<Note>(),
        PUT: u.input(noteSchema).output<Note>(),
        DELETE: u.output<Note>(),
    },
    '/event': {
        GET: u.output<Event[]>(),
        POST: u.input(eventSchema).output<Event>(),
    },
    '/event/:id': {
        GET: u.output<Event>(),
        PUT: u.input(eventSchema).output<Event>(),
        DELETE: u.output<Event>(),
    },
    '/permission': {
        GET: u.output<Permission[]>(),
    },
    '/permission/:id': {
        PUT: u.input(permissionSchema).output<User>(),
        DELETE: u.output<User>(),
    },
})

export const client = createTypeLevelClient<typeof router>((path, method, input) => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const token = path === '/auth/refresh' ? refreshToken : accessToken

    return fetch('http://localhost' + path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
    }).then(async (res) => {
        // if the refresh token is expired, try to refresh it
        if (res.status === 401) {
            if (accessToken && refreshToken) {
                await fetch('http://localhost/auth/refresh', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(async (res) => {
                        const tokens = await tokensSchema.parseAsync(res.json())

                        localStorage.setItem('accessToken', tokens.accessToken)
                        localStorage.setItem('refreshToken', tokens.refreshToken)

                        // try the original request again
                        return fetch('http://localhost' + path, {
                            method,
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${tokens.accessToken}`,
                            },
                            body: JSON.stringify(input),
                        }).then((res) => {
                            if (res.ok) {
                                return res.json()
                            } else {
                                throw new Error(res.statusText)
                            }
                        })
                    })
                    .catch((err) => {
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')

                        window.location.href = '/login'

                        throw new Error(err.statusText)
                    })
            } else {
                window.location.href = '/login'
            }
        } else if (res.ok) {
            return res.json()
        } else {
            throw new Error(res.statusText)
        }
    })
})
