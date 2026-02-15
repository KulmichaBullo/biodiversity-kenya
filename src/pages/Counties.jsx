import React, { useEffect, useState } from 'react';
import { gbifApi } from '../services/gbif';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import KenyaMap from '../components/KenyaMap';
import { getCountyImage } from '../data/countyImages';
import { ListSkeleton } from '../components/Skeleton';

const Counties = () => {
    const [counties, setCounties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    // Sync search term with URL
    const searchTerm = searchParams.get('search') || '';

    useEffect(() => {
        const fetchCounties = async () => {
            try {
                const data = await gbifApi.getKenyanCounties();
                setCounties(data);
            } catch (error) {
                console.error("Failed to load counties", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCounties();
    }, []);

    const handleSearch = (term) => {
        setSearchParams({ search: term });
    };

    const handleSelectCounty = (name) => {
        handleSearch(name);
    };

    const filteredCounties = counties.filter(county =>
        county.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
            {/* Sidebar Map - Hidden on mobile, sticky on desktop */}
            <div className="hidden lg:block lg:w-1/3 xl:w-1/4 flex-shrink-0 h-full">
                <div className="sticky top-24 h-full bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur-sm p-4 flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-4 px-2">Interactive Map</h2>
                    <div className="flex-1 rounded-2xl overflow-hidden border border-slate-800 relative">
                        <KenyaMap
                            onSelectCounty={handleSelectCounty}
                            selectedCountyName={searchTerm}
                        />
                    </div>
                    <div className="mt-4 text-xs text-slate-500 px-2 text-center">
                        Select a region to zoom and filter the list.
                    </div>
                </div>
            </div>

            {/* Main List Section */}
            <div className="flex-1 flex flex-col pointer-events-auto h-full overflow-hidden">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm mb-6 flex-shrink-0">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-white">Kenyan Counties</h1>
                        <p className="text-slate-400">Showing {filteredCounties.length} regions.</p>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-green-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search or select on map..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-inner"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Scrollable Grid */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-24">
                    {loading ? (
                        <ListSkeleton count={9} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCounties.map((county) => (
                                <Link
                                    to={`/counties/${encodeURIComponent(county.id)}`}
                                    key={county.id}
                                    className="bg-slate-800 rounded-2xl p-0 overflow-hidden border border-slate-700 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/20 transition-all cursor-pointer group flex flex-col h-full"
                                >
                                    {/* Card Header with Feature Image */}
                                    <div className="h-40 bg-slate-900 relative overflow-hidden">
                                        <img
                                            src={getCountyImage(county.name)}
                                            alt={county.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                                        <div className="absolute bottom-3 left-4 z-20 flex items-center space-x-2">
                                            <div className="bg-green-500/20 p-1.5 rounded-lg backdrop-blur-md border border-green-500/30">
                                                <MapPin className="w-4 h-4 text-green-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="font-bold text-lg text-white mb-1 group-hover:text-green-400 transition-colors">
                                            {county.name}
                                        </h3>
                                        <div className="w-10 h-1 bg-slate-700 rounded-full mb-3 group-hover:w-full group-hover:bg-green-600 transition-all duration-500" />

                                        <p className="text-xs text-slate-500 mt-auto flex justify-between items-center">
                                            <span>Explore Flora & Fauna</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-green-500" />
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Counties;
