import { useNavigate, useParams } from 'react-router-dom'
import { Event, client, eventSchema } from '../router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FC } from 'react'

const formSchema = z.object({
    title: z.string().min(4),
    content: z.string().min(4),
    // format yyyy-MM-ddThh:mm
    start: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/, 'must be in format yyyy-MM-ddThh:mm'),
    end: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/, 'must be in format yyyy-MM-ddThh:mm'),
})

type ValidationSchema = z.infer<typeof formSchema>

export const Edit = () => {
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

    return <EditForm event={data} />
}

const EditForm: FC<{
    event: Event
}> = ({ event }) => {
    const navigate = useNavigate()

    const { mutate, isError, isSuccess } = useMutation({
        mutationFn: (data: ValidationSchema) => {
            const { start, end, ...rest } = data

            const values = eventSchema.parse({
                ...rest,
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString(),
            })

            return client('/event', 'POST', values)
        },
        onSuccess(data) {
            navigate(`/dashboard/event/${data.id}`)
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        // getValues,
    } = useForm<ValidationSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: event.title,
            content: event.content,
            start: new Date(event.start).toISOString().slice(0, 16),
            end: new Date(event.end).toISOString().slice(0, 16),
        },
    })

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit((data) => mutate(data))}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
                        Title
                    </label>
                    <input
                        className={classNames(
                            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border',
                            {
                                'border-red-500': errors.title,
                            },
                            'rounded appearance-none focus:outline-none focus:shadow-outline'
                        )}
                        id="title"
                        type="text"
                        {...register('title')}
                    />
                    {errors.title && <p className="text-xs italic text-red-500 mt-2">{errors.title?.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="content">
                        Content
                    </label>
                    <input
                        className={classNames(
                            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border',
                            {
                                'border-red-500': errors.content,
                            },
                            'rounded appearance-none focus:outline-none focus:shadow-outline'
                        )}
                        id="content"
                        type="text"
                        {...register('content')}
                    />
                    {errors.content && <p className="text-xs italic text-red-500 mt-2">{errors.content?.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="start">
                        Start
                    </label>
                    <input
                        className={classNames(
                            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border',
                            {
                                'border-red-500': errors.start,
                            },
                            'rounded appearance-none focus:outline-none focus:shadow-outline'
                        )}
                        id="start"
                        type="datetime-local"
                        {...register('start')}
                        onChange={(e) => {
                            const value = e.target.value
                            const date = new Date(value)
                            // format yyyy-MM-ddThh:mm
                            const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
                            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                            const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
                            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

                            const formattedDate = `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`
                            e.target.value = formattedDate
                        }}
                    />
                    {errors.start && <p className="text-xs italic text-red-500 mt-2">{errors.start?.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="end">
                        End
                    </label>
                    <input
                        className={classNames(
                            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border',
                            {
                                'border-red-500': errors.end,
                            },
                            'rounded appearance-none focus:outline-none focus:shadow-outline'
                        )}
                        id="end"
                        type="datetime-local"
                        {...register('end')}
                        onChange={(e) => {
                            const value = e.target.value
                            const date = new Date(value)
                            // format yyyy-MM-ddThh:mm
                            const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
                            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                            const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
                            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

                            const formattedDate = `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`
                            e.target.value = formattedDate
                        }}
                    />
                    {errors.end && <p className="text-xs italic text-red-500 mt-2">{errors.end?.message}</p>}
                </div>

                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitting || isSuccess}
                    >
                        Update
                    </button>
                </div>

                {isError && <p className="text-md text-center text-red-500 mt-2">An error occurred</p>}
            </form>
        </div>
    )
}
