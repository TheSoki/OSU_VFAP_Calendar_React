import { FC, ReactNode, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LayoutMenu } from './LayoutMenu'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Toaster } from 'react-hot-toast'

const items = [
    {
        title: 'Product',
        items: [
            'Features',
            'Security',
            'Pricing',
            'Resources',
            'More Products',
            "What's New",
        ],
    },
    {
        title: 'Platform',
        items: ['Developer API', 'Mobile', 'Table', 'Desktop'],
    },
    {
        title: 'Support',
        items: ['About', 'Community', 'Blog', 'Help Center', 'Contact Us'],
    },
    {
        title: 'Company',
        items: ['Legal', 'About', 'Blog', 'Careers'],
    },
]

export const Layout: FC<{
    children: ReactNode
}> = ({ children }) => {
    const windowSize = useWindowSize()

    const memoizedPosition = useMemo(
        () => (windowSize.width < 768 ? 'top-center' : 'bottom-right'),
        [windowSize.width]
    )

    return (
        <>
            <div className="bg-gray-50">
                <div className="min-h-screen flex flex-col">
                    <nav className="w-full  max-w-7xl mx-auto px-4 sm:px-6  flex justify-between items-center py-4">
                        <Link to="/">
                            <img src="./logo.jpg" width={50} height={41} alt="Logo" />
                        </Link>
                        <LayoutMenu />
                    </nav>

                    <main className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                        {children}
                    </main>

                    <footer className="mt-auto">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12">
                                <div className="col-span-12 lg:col-span-4">
                                    <div className="mb-2">
                                        <Link
                                            className="inline-block font-bold text-xl"
                                            to="/"
                                        >
                                            Your Calendar App
                                        </Link>
                                        <p className="mt-2 text-sm text-gray-600">
                                            &copy; {new Date().getFullYear()} All
                                            rights reserved.
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <Link
                                            className="text-gray-600 hover:text-gray-700 hover:underline transition duration-150 ease-in-out"
                                            to="#"
                                        >
                                            About Us
                                        </Link>
                                        {' | '}
                                        <Link
                                            className="text-gray-600 hover:text-gray-700 hover:underline transition duration-150 ease-in-out"
                                            to="#"
                                        >
                                            Contact Us
                                        </Link>
                                        <br />
                                        <Link
                                            className="text-gray-600 hover:text-gray-700 hover:underline transition duration-150 ease-in-out"
                                            to="#"
                                        >
                                            Terms of Service
                                        </Link>
                                        {' | '}
                                        <Link
                                            className="text-gray-600 hover:text-gray-700 hover:underline transition duration-150 ease-in-out"
                                            to="#"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </div>
                                </div>

                                {items.map((section) => (
                                    <div
                                        className="col-span-6 md:col-span-3 lg:col-span-2"
                                        key={section.title}
                                    >
                                        <div className="text-gray-800 font-medium mb-2">
                                            {section.title}
                                        </div>
                                        <ul className="text-sm">
                                            {section.items.map((item) => (
                                                <li className="mb-2" key={item}>
                                                    <Link
                                                        className="text-gray-600 hover:text-gray-700 hover:underline transition duration-150 ease-in-out"
                                                        to="#"
                                                    >
                                                        {item}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            <Toaster
                toastOptions={{
                    position: memoizedPosition,
                }}
            />
        </>
    )
}
