import { Link } from 'react-router-dom'

export const Index = () => (
    <>
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Your Calendar App</h1>
        <p className="text-xl text-gray-600 mb-8">Keep track of your busy schedule with ease.</p>
        <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex-1">
                <img src="/screenshot.png" width={800} height={600} alt="Calendar" />
            </div>
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Never Miss an Appointment Again</h2>
                <p className="text-xl text-gray-600 mb-8">
                    With our intuitive interface, you can easily add, edit, and delete appointments on the go.
                </p>
                <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" to="/register">
                    Get Started
                </Link>
            </div>
        </div>
    </>
)
