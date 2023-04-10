import classNames from 'classnames'
import { Link } from 'react-router-dom'

const getClassNames = (path: string) =>
    classNames('inline-block p-4 rounded-t-lg', {
        'text-blue-600 bg-gray-100 active': window.location.pathname === path,
        'hover:text-gray-600 hover:bg-gray-50': window.location.pathname !== path,
    })

export const SnackbarLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <li className="mr-2">
                <Link to="/dashboard" className={getClassNames('/dashboard')}>
                    All
                </Link>
            </li>
            <li className="mr-2">
                <Link to="/dashboard/create" className={getClassNames('/dashboard/create')}>
                    Create
                </Link>
            </li>
        </ul>
        {children}
    </div>
)
