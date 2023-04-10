import { initUntypeable, createTypeLevelClient } from 'untypeable'
import {
    registerSchema,
    loginSchema,
    userSchema,
    noteSchema,
    eventSchema,
    updateUserSchema,
    permissionSchema,
    methodWithId,
} from './schema'
import { Tokens, User, Note, Permission, Event } from './types'

const u = initUntypeable().pushArg<'GET' | 'POST' | 'PUT' | 'DELETE'>()

// access and refresh token are consumed from the request header via "Authorization": "Bearer <token>"
const router = u.router({
    '/auth/logout': {
        GET: u.output<void>(),
    },
    // '/auth/refresh': {
    // GET: u.output<Tokens>(),
    // },
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
        GET: u.input(methodWithId).output<User>(),
        PUT: u.input(updateUserSchema.merge(methodWithId)).output<User>(),
        DELETE: u.input(methodWithId).output<User>(),
    },
    '/note': {
        GET: u.output<Note[]>(),
        POST: u.input(noteSchema).output<Note>(),
    },
    '/note/:id': {
        GET: u.input(methodWithId).output<Note>(),
        PUT: u.input(noteSchema.merge(methodWithId)).output<Note>(),
        DELETE: u.input(methodWithId).output<Note>(),
    },
    '/event': {
        GET: u.output<Event[]>(),
        POST: u.input(eventSchema).output<Event>(),
    },
    '/event/:id': {
        GET: u.input(methodWithId).output<Event>(),
        PUT: u.input(eventSchema.merge(methodWithId)).output<Event>(),
        DELETE: u.input(methodWithId).output<Event>(),
    },
    '/permission': {
        GET: u.output<Permission[]>(),
    },
    '/permission/:id': {
        PUT: u.input(permissionSchema.merge(methodWithId)).output<User>(),
        DELETE: u.input(methodWithId).output<User>(),
    },
})

export const client = createTypeLevelClient<typeof router>((path, method, input) => {
    const accessToken = localStorage.getItem('accessToken')

    const processedPath = path.includes(':id') ? path.replace(':id', input.id || '') : path

    return fetch('http://localhost' + processedPath, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: method === 'GET' ? undefined : JSON.stringify(input),
    }).then((res) => {
        if (res.ok) {
            if (path === '/auth/logout') return null
            return res.json()
        }

        if (res.status === 401) {
            localStorage.removeItem('accessToken')
            window.location.href = '/login'
        } else {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
    })
})
