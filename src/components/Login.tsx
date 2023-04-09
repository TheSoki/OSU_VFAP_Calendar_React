import { SubmitHandler, useForm } from 'react-hook-form'
import { client, loginSchema } from '../router'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

type ValidationSchema = z.infer<typeof loginSchema>

export const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit: SubmitHandler<ValidationSchema> = useCallback((data) => {
        client('/auth/login', 'POST', data)
            .then((res) => {
                localStorage.setItem('accessToken', res.accessToken)
                localStorage.setItem('refreshToken', res.refreshToken)
                setError(null)
                navigate('/dashboard')
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [])

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className={classNames(
                            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border',
                            {
                                'border-red-500': errors.email,
                            },
                            'rounded appearance-none focus:outline-none focus:shadow-outline'
                        )}
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-xs italic text-red-500 mt-2">
                            {errors.email?.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className={classNames(
                            'w-full px-3 py-2 text-sm leading-tight text-gray-700 border',
                            {
                                'border-red-500': errors.password,
                            },
                            'rounded appearance-none focus:outline-none focus:shadow-outline'
                        )}
                        id="password"
                        type="password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-xs italic text-red-500 mt-2">
                            {errors.password?.message}
                        </p>
                    )}
                </div>

                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Login
                    </button>
                </div>

                {error && (
                    <p className="text-md text-center text-red-500 mt-2">{error}</p>
                )}
            </form>

            <div className="text-center">
                Don't have an account?{' '}
                <Link className="text-blue-500 hover:text-blue-800" to="/register">
                    Register!
                </Link>
            </div>
        </div>
    )
}
