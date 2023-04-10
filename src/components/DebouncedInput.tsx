import { FC, useEffect, useState } from 'react'

export const DebouncedInput: FC<{
    value: string
    onChange: (value: string) => void
}> = ({ value, onChange }) => {
    const [searchQuery, setSearchQuery] = useState(value)

    useEffect(() => {
        if (value === searchQuery) return

        const handler = setTimeout(() => {
            onChange(searchQuery)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [value, onChange, searchQuery])

    return (
        <input
            type="text"
            placeholder="Search"
            className="px-3 py-2 text-sm text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    )
}
