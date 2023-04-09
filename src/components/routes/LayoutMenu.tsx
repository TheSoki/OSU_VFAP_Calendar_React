import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { client } from '../../router'
import classNames from 'classnames'

export const LayoutMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const isLoggedIn = accessToken && refreshToken

    const logout = useCallback(() => {
        try {
            client('/auth/logout', 'GET')
        } catch {
            /* empty */
        }
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/')
    }, [])

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        },
        [menuRef]
    )

    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        },
        [menuRef]
    )

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [handleOutsideClick, handleEscape])

    if (!isLoggedIn) {
        return (
            <div className="flex items-center">
                <Link
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                    to="/login"
                >
                    Login
                </Link>
                <span className="mx-2 text-gray-600">|</span>
                <Link
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                    to="/register"
                >
                    Register
                </Link>
            </div>
        )
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Menu{' '}
                {!isOpen ? (
                    <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                ) : (
                    <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                        ></path>
                    </svg>
                )}
            </button>
            <div
                className={classNames(
                    'absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44',
                    {
                        hidden: !isOpen,
                    }
                )}
            >
                <ul className="py-2 text-sm text-gray-700">
                    {[
                        {
                            name: 'Dashboard',
                            link: '/dashboard',
                        },
                        {
                            name: 'Logout',
                            onClick: logout,
                        },
                    ].map((item, index) => (
                        <li key={index}>
                            {item.link ? (
                                <Link
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    to={item.link}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <button
                                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                                    onClick={() => {
                                        setIsOpen(false)
                                        item.onClick && item.onClick()
                                    }}
                                >
                                    {item.name}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
