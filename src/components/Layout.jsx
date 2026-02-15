import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Map, Leaf, Menu, X } from 'lucide-react';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-green-500/30">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-2 rounded-lg shadow-lg shadow-green-900/20 group-hover:shadow-green-500/20 transition-all duration-300">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                Kenya Bio
                            </span>
                        </Link>

                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-sm font-medium text-slate-400 hover:text-green-400 transition-colors">Home</Link>
                            <Link to="/counties" className="text-sm font-medium text-slate-400 hover:text-green-400 transition-colors">Counties</Link>
                            <Link to="/identify" className="text-sm font-medium text-slate-400 hover:text-green-400 transition-colors">Identify</Link>
                        </div>

                        <button
                            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full backdrop-blur-xl">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className="block px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-green-400 rounded-lg font-medium transition-all">Home</Link>
                            <Link to="/counties" className="block px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-green-400 rounded-lg font-medium transition-all">Counties</Link>
                            <Link to="/identify" className="block px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-green-400 rounded-lg font-medium transition-all">Identify Species</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-20 min-h-screen relative overflow-hidden">
                {/* Ambient Background Effects */}
                <div className="fixed top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none -z-10 mix-blend-screen" />
                <div className="fixed bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10 mix-blend-screen" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in relative z-10">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 mt-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Kenya Bio-Explorer</h3>
                            <p className="text-sm leading-relaxed">Connecting people with nature through open data. Explore the rich flora and fauna of Kenya's 47 counties.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Data Source</h3>
                            <p className="text-sm">
                                Powered by <a href="https://www.gbif.org" className="text-green-400 hover:text-green-300 hover:underline transition-colors">GBIF API</a>.
                                <br />Global Biodiversity Information Facility.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Project</h3>
                            <p className="text-sm">
                                An open-source initiative for conservation awareness.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
                        © {new Date().getFullYear()} Kenya Bio-Explorer. All Data Rights Reserved to Publishers.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
