export default function Footer() {
    return (
        <footer className="mt-20 bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold gradient-text mb-4">
                            Movie News Hub
                        </h3>
                        <p className="text-gray-400">
                            Your source for the latest entertainment news and movie updates.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/category/hollywood" className="text-gray-400 hover:text-white transition-colors">
                                    Hollywood
                                </a>
                            </li>
                            <li>
                                <a href="/category/bollywood" className="text-gray-400 hover:text-white transition-colors">
                                    Bollywood
                                </a>
                            </li>
                            <li>
                                <a href="/category/web-series" className="text-gray-400 hover:text-white transition-colors">
                                    Web Series
                                </a>
                            </li>
                            <li>
                                <a href="/category/reviews" className="text-gray-400 hover:text-white transition-colors">
                                    Reviews
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <p className="text-gray-400">
                            © {new Date().getFullYear()} Movie News Hub. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
