import classNames from 'classnames'
import { Event, client } from '../router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { pushNotification } from '../utils/notifications'
import { FC, useCallback, useMemo, useState } from 'react'
import { DebouncedInput } from './DebouncedInput'

const ITEMS_PER_PAGE = 5

export const Dashboard = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['/event'],
        queryFn: () => client('/event', 'GET'),
    })

    if (isLoading) {
        return <>Loading...</>
    }

    if (error || !data) {
        return <>An error has occurred</>
    }

    return <DashboardTable events={data} refetch={refetch} />
}

const DashboardTable: FC<{
    refetch: () => void
    events: Event[]
}> = ({ refetch, events }) => {
    const { mutate, isLoading: isDeleting } = useMutation({
        mutationFn: (data: { id: string }) => client('/event/:id', 'DELETE', data),
        onSuccess() {
            pushNotification({
                message: 'Event deleted',
                type: 'SUCCESS',
            })
            refetch()
        },
        onError() {
            pushNotification({
                message: 'An error has occurred while deleting the event',
                type: 'ERROR',
            })
        },
    })

    const [search, setSearch] = useState('')
    const [field, setField] = useState<'title' | 'content' | 'start' | 'end' | 'createdAt'>('createdAt')
    const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
    const maxPage = Math.ceil(events.length / ITEMS_PER_PAGE)
    const [page, setPage] = useState(1)

    const changeOrder = useCallback(
        (newField: 'title' | 'content' | 'start' | 'end' | 'createdAt') => {
            if (field === newField) {
                setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))
            }

            setField(newField)
        },
        [field]
    )

    const filteredEvents = useMemo(() => {
        if (!search) {
            return events
        }

        return events.filter((event) => {
            return (
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.content.toLowerCase().includes(search.toLowerCase())
            )
        })
    }, [events, search])

    const sortedEvents = useMemo(() => {
        return filteredEvents.sort((a, b) => {
            const isDateField = ['start', 'end', 'createdAt'].includes(field)

            const A = isDateField ? new Date(a[field]).getTime() : a[field]
            const B = isDateField ? new Date(b[field]).getTime() : b[field]

            if (A < B) {
                return orderBy === 'asc' ? -1 : 1
            }

            if (A > B) {
                return orderBy === 'asc' ? 1 : -1
            }

            return 0
        })
    }, [filteredEvents, field, orderBy])

    const getSortIcon = useCallback(
        (current: 'title' | 'content' | 'start' | 'end' | 'createdAt') => {
            if (field === current && orderBy === 'asc') {
                return '▲'
            }

            if (field === current && orderBy === 'desc') {
                return '▼'
            }

            return ''
        },
        [field, orderBy]
    )

    return (
        <>
            <div className="my-2">
                <DebouncedInput value={search} onChange={setSearch} />
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => changeOrder('title')}>
                                {getSortIcon('title')}
                                title
                            </th>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => changeOrder('content')}>
                                {getSortIcon('content')}
                                content
                            </th>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => changeOrder('start')}>
                                {getSortIcon('start')}
                                start
                            </th>
                            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => changeOrder('end')}>
                                {getSortIcon('end')}
                                end
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 cursor-pointer"
                                onClick={() => changeOrder('createdAt')}
                            >
                                {getSortIcon('createdAt')}
                                created at
                            </th>
                            <th scope="col" className="px-6 py-3">
                                actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEvents.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map((event, index) => {
                            const isOdd = index % 2 === 0

                            return (
                                <tr
                                    key={event.id}
                                    className={classNames('', {
                                        'bg-gray-100': isOdd,
                                        'bg-gray-200': !isOdd,
                                    })}
                                >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {event.title}
                                    </th>
                                    <td className="px-6 py-4">{event.content}</td>
                                    <td className="px-6 py-4">{`${new Date(event.start).toLocaleString()}`}</td>
                                    <td className="px-6 py-4">{`${new Date(event.end).toLocaleString()}`}</td>
                                    <td className="px-6 py-4">{new Date(event.createdAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <Link to={`/dashboard/event/${event.id}/edit`}>Edit</Link>
                                        <Link to={`/dashboard/event/${event.id}`}>Detail</Link>
                                        <button
                                            disabled={isDeleting}
                                            className="ml-2 text-red-500"
                                            onClick={() => {
                                                mutate({ id: event.id })
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex space-x-2">
                    <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
                        Previous
                    </button>
                    <button disabled={page === maxPage} onClick={() => setPage((prev) => prev + 1)}>
                        Next
                    </button>
                </div>
                <div className="text-gray-500">
                    {page} / {maxPage}
                </div>
            </div>
        </>
    )
}
