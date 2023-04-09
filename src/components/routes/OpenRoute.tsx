import { FC, ReactNode } from 'react'
import { Layout } from './Layout'

export const OpenRoute: FC<{
    children: ReactNode
}> = ({ children }) => {
    return <Layout>{children}</Layout>
}
