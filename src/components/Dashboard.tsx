import classNames from 'classnames'
import { client } from '../router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { pushNotification } from '../utils/notifications'

export const Dashboard = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['/event'],
        queryFn: () => client('/event', 'GET'),
    })
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

    if (isLoading) {
        return <>Loading...</>
    }

    if (error || !data) {
        return <>An error has occurred</>
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            content
                        </th>
                        <th scope="col" className="px-6 py-3">
                            from - to
                        </th>
                        <th scope="col" className="px-6 py-3">
                            created at
                        </th>
                        <th scope="col" className="px-6 py-3">
                            actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((event, index) => {
                        const isOdd = index % 2 === 0

                        return (
                            <tr
                                key={event.id}
                                className={classNames('', {
                                    'bg-white border-b': isOdd,
                                    'bg-white': isOdd,
                                })}
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {event.title}
                                </th>
                                <td className="px-6 py-4">{event.content}</td>
                                <td className="px-6 py-4">
                                    {`${new Date(event.start).toLocaleString()} - ${new Date(
                                        event.end
                                    ).toLocaleString()}`}
                                </td>
                                <td className="px-6 py-4">{new Date(event.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <Link to={`/dashboard/event/${event.id}/edit`}>Edit</Link>
                                    <Link to={`/dashboard/event/${event.id}`}>View</Link>
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
    )
}
