export default function Hero() {
    return (
        <section className="relative py-20 px-4 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
                    Latest Movie News & Entertainment
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
                    Stay updated with the hottest news from Hollywood, Bollywood, music industry, and streaming platforms
                </p>
                <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
                    <a
                        href="/category/hollywood"
                        className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        Explore Hollywood
                    </a>
                    <a
                        href="/category/bollywood"
                        className="px-8 py-3 bg-white/10 backdrop-blur-lg text-white border-2 border-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all"
                    >
                        Discover Bollywood
                    </a>
                </div>
            </div>
        </section>
    )
}
