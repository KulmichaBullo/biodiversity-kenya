import { Link, useNavigate } from 'react-router-dom';
import { Map, TreePine, PawPrint, ArrowRight, Compass, Sparkles, TrendingUp } from 'lucide-react';
import KenyaMap from '../components/KenyaMap';
import { gbifApi } from '../services/gbif';
import { inaturalistApi } from '../services/inaturalist';
import { ListSkeleton } from '../components/Skeleton';

// Using a high-quality placeholder image for hero if specific unsplash one fails, 
// but sticking to the previous quality one for now.
const HERO_IMAGE = "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80";

const Home = () => {
    const navigate = useNavigate();
    const [trending, setTrending] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchTrending = async () => {
            try {
                // Fetch general popular species in Kenya
                const data = await inaturalistApi.getObservations({
                    countyName: 'Kenya',
                    limit: 3
                });
                setTrending(data.results || []);
            } catch (err) {
                console.error("Failed to fetch trending", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    const handleSelectCounty = async (countyName) => {
        try {
            // Try to find the county ID from the list to enable direct navigation
            const counties = await gbifApi.getKenyanCounties();
            const matched = counties.find(c =>
                c.name.toLowerCase() === countyName.toLowerCase() ||
                countyName.toLowerCase().includes(c.name.toLowerCase())
            );

            if (matched) {
                navigate(`/counties/${encodeURIComponent(matched.id)}`);
            } else {
                // Fallback to search if no direct match found
                navigate(`/counties?search=${encodeURIComponent(countyName)}`);
            }
        } catch (err) {
            navigate(`/counties?search=${encodeURIComponent(countyName)}`);
        }
    };
    return (
        <div className="space-y-24 pb-12">
            {/* Hero Section */}
            <section className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent z-10 transition-opacity duration-1000" />
                <img
                    src={HERO_IMAGE}
                    alt="African Savanna"
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[20s]"
                />

                <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 text-white max-w-4xl">
                    <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-full w-fit mb-6 border border-green-500/30">
                        <Compass className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-200">Explore Kenya's Natural Wonders</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                        Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Wild Heart</span> <br />
                        of Africa.
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                        A comprehensive bio-data explorer for Kenya's 47 counties.
                        Documenting the rich tapestry of Flora and Fauna.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/counties"
                            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all flex items-center justify-center shadow-lg shadow-green-900/50 hover:shadow-green-500/30 ring-2 ring-green-600 ring-offset-2 ring-offset-slate-900"
                        >
                            Start Exploration <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            to="/identify"
                            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center shadow-lg shadow-purple-900/50 hover:shadow-purple-500/30"
                        >
                            <Sparkles className="mr-2 w-5 h-5" />
                            Identify Species
                        </Link>
                        <a
                            href="#map-section" // Smooth scroll to map
                            className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-md text-white font-bold rounded-xl transition-all border border-slate-700 flex items-center justify-center"
                        >
                            View Map
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats/Features Grid */}
            <section className="grid md:grid-cols-3 gap-8">
                <Link to="/counties" className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 hover:border-green-500/50 hover:bg-slate-800 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-green-500/20 transition-all" />

                    <div className="w-14 h-14 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-600">
                        <Map className="w-7 h-7 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">47 Counties</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Navigate through administrative boundaries to discover region-specific biodiversity.
                    </p>
                </Link>

                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 hover:bg-slate-800 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-all" />

                    <div className="w-14 h-14 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-600">
                        <PawPrint className="w-7 h-7 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Rich Fauna</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Data on mammals, birds, reptiles, and insects sourced directly from GBIF occurrences.
                    </p>
                </div>

                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all" />

                    <div className="w-14 h-14 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-600">
                        <TreePine className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Diverse Flora</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Explore botanical observations ranging from coastal mangroves to alpine vegetation.
                    </p>
                </div>
            </section>

            {/* Map Section */}
            <section id="map-section" className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 text-center mb-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Interactive Map</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Select a county geographically to begin your journey.</p>
                </div>

                <div className="bg-slate-950/50 rounded-2xl h-[600px] w-full border border-slate-800 relative shadow-inner overflow-hidden">
                    <KenyaMap onSelectCounty={handleSelectCounty} />
                </div>
            </section>

            {/* Trending Species Section */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <TrendingUp className="text-green-500 w-8 h-8" />
                            Trending in Kenya
                        </h2>
                        <p className="text-slate-400">Most observed species across the country right now.</p>
                    </div>
                </div>

                {loading ? (
                    <ListSkeleton count={3} />
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {trending.map((item) => (
                            <div key={item.taxon.id} className="bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 group hover:border-green-500/50 transition-all flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={item.taxon.default_photo?.medium_url}
                                        alt={item.taxon.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white text-xs font-bold">
                                        {item.count} Observations
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                                        {item.taxon.preferred_common_name || item.taxon.name}
                                    </h3>
                                    <p className="text-slate-500 italic text-sm mb-4">{item.taxon.name}</p>
                                    <button
                                        onClick={() => navigate(`/counties?search=${encodeURIComponent(item.taxon.name)}`)}
                                        className="mt-auto w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-700 hover:border-green-500/50 transition-all text-sm"
                                    >
                                        Explore Habitat
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
