export type Tokens = {
    accessToken: string
    refreshToken: string
}

export type User = {
    id: string
    email: string
    name: string
    accountId: string
}

export type Note = {
    id: string
    createdAt: Date
    title: string
    content: string
    userId: string
}

export type Event = {
    id: string
    createdAt: Date
    title: string
    content: string
    start: Date
    end: Date
    userId: string
}

export type Permission = {
    id: string
    name: string
}
