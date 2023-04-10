import { useParams } from 'react-router-dom'
import { client } from '../router'
import { useQuery } from '@tanstack/react-query'

export const Detail = () => {
    const { id } = useParams()

    const { data, isLoading, error } = useQuery(
        ['/event/:id', { id: id || '' }],
        () => client('/event/:id', 'GET', { id: id || '' }),
        {
            enabled: !!id,
        }
    )

    if (isLoading) {
        return <>Loading...</>
    }

    if (error || !data) {
        return <>An error has occurred</>
    }

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
            <div className="px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        value={data.title}
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="content">
                        Content
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="content"
                        type="text"
                        value={data.content}
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="start">
                        Start
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="start"
                        type="text"
                        value={new Date(data.start).toLocaleString()}
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="end">
                        End
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="end"
                        type="text"
                        value={new Date(data.end).toLocaleString()}
                        disabled
                    />
                </div>
            </div>
        </div>
    )
}
