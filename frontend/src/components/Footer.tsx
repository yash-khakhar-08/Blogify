import { Link } from "react-router-dom"

const Footer = () => {
    return (

        <footer className="bg-gray-900 text-gray-300">

            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div>
                    <h2 className="text-xl font-semibold text-white">Blogify</h2>
                    <p className="text-sm mt-2 text-gray-400">
                        Share your thoughts, ideas, and stories with the world.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            <Link to='/blog/create'>Create Blog</Link>
                        </li>
                    </ul>
                </div>

                <div className="text-sm md:text-right">
                    <p>© {new Date().getFullYear()} Blogify</p>
                    <p className="text-gray-400 mt-1">All rights reserved.</p>
                </div>

            </div>
        </footer>
    )
}

export default Footer
