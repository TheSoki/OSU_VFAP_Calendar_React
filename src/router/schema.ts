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
    start: z.date(),
    end: z.date(),
})

export const permissionSchema = z.object({
    permission: z.enum(['ADMIN', 'USER']),
})

export const tokensSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
})
