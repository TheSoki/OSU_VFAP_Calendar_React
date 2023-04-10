import { z } from 'zod'

export const registerSchema = z.object({
    email: z.string().min(4).email(),
    name: z.string().min(4),
    password: z.string().min(4),
})

export const loginSchema = z.object({
    email: z.string().min(4).email(),
    password: z.string().min(4),
})

export const userSchema = z.object({
    email: z.string().min(4).email(),
    name: z.string().min(4),
    password: z.string().min(4),
})

export const updateUserSchema = z.object({
    email: z.string().min(4).email(),
    name: z.string().min(4),
})

export const noteSchema = z.object({
    title: z.string().min(4),
    content: z.string().min(4),
})

export const eventSchema = z.object({
    title: z.string().min(4),
    content: z.string().min(4),
    // format YYYY-MM-DDTHH:mm:ss.sssZ (2023-04-10T17:26:33.086Z) (ISO 8601)
    start: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/),
    end: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/),
})

export const permissionSchema = z.object({
    permission: z.enum(['ADMIN', 'USER']),
})

export const methodWithId = z.object({
    id: z.string().uuid(),
})
