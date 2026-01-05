import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gbifApi } from '../services/gbif';
import { inaturalistApi, TAXON_IDS } from '../services/inaturalist';
import { Loader2, ArrowLeft, Leaf, PawPrint, Info, ExternalLink, Filter, Camera, Bird, Bug, Fish, AlignLeft, Search, ChevronDown, ChevronRight } from 'lucide-react';
import SpeciesModal from '../components/SpeciesModal';

const CountyDetails = () => {
    const { key } = useParams();
    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countyName, setCountyName] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState(null);

    // Filters State
    const [activeTab, setActiveTab] = useState('fauna'); // 'fauna' | 'flora'
    const [selectedClass, setSelectedClass] = useState(null);
    const [onlyImages, setOnlyImages] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // Text search filter
    const [expandedFilters, setExpandedFilters] = useState({}); // Track expanded Invertebrates


    // 1. Resolve County Name from ID (using GBIF list as lookup)
    useEffect(() => {
        const resolveCountyName = async () => {
            try {
                // We could optimize this by passing state from previous page, but this ensures deep links work
                const counties = await gbifApi.getKenyanCounties();
                const matched = counties.find(c => c.id === key);
                if (matched) {
                    setCountyName(matched.name);
                } else {
                    setCountyName(key); // Fallback to ID if not found, though unlikely to work well for search
                }
            } catch (err) {
                console.error("Error resolving county name:", err);
                setCountyName(key);
            }
        };
        resolveCountyName();
    }, [key]);

    // 2. Fetch Observations from iNaturalist
    useEffect(() => {
        const fetchSpecies = async () => {
            if (!countyName) return;

            setLoading(true);
            setSpecies([]);
            try {
                // Determine Taxon ID to filter by
                let taxonId = null;
                if (activeTab === 'fauna') {
                    taxonId = selectedClass || TAXON_IDS.ANIMALS;
                } else {
                    taxonId = selectedClass || TAXON_IDS.PLANTS;
                }

                const data = await inaturalistApi.getObservations({
                    countyName,
                    taxonId,
                    limit: 60
                });

                if (data.results) {
                    setSpecies(data.results);
                }
            } catch (error) {
                console.error("Error fetching details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpecies();
    }, [countyName, activeTab, selectedClass, onlyImages]);

    // Helper to get Icon based on class/taxon
    const getIconForClass = (taxon) => {
        if (!taxon) return <Leaf className="w-4 h-4 text-green-400" />;
        const iconic = taxon.iconic_taxon_name || '';

        if (iconic === 'Aves') return <Bird className="w-4 h-4 text-sky-400" />;
        if (iconic === 'Insecta' || iconic === 'Arachnida') return <Bug className="w-4 h-4 text-amber-500" />;
        if (iconic === 'Amphibia' || iconic === 'Reptilia') return <AlignLeft className="w-4 h-4 text-emerald-500" />;
        if (iconic === 'Mammalia') return <PawPrint className="w-4 h-4 text-orange-400" />;
        if (iconic === 'Actinopterygii' || iconic.includes('Fish')) return <Fish className="w-4 h-4 text-blue-400" />;
        return <Leaf className="w-4 h-4 text-green-400" />;
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                <div>
                    <Link
                        to="/counties"
                        className="inline-flex items-center text-slate-400 hover:text-green-400 transition-colors group mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Counties</span>
                    </Link>

                    <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 sticky top-24">
                        <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
                            <Filter className="w-5 h-5 text-green-500" /> Filters
                        </div>

                        {/* Kingdom Tabs */}
                        <div className="flex p-1 bg-slate-950 rounded-xl mb-6 border border-slate-800">
                            <button
                                onClick={() => { setActiveTab('fauna'); setSelectedClass(null); }}
                                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'fauna' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <PawPrint className="w-4 h-4 mr-2" /> Fauna
                            </button>
                            <button
                                onClick={() => { setActiveTab('flora'); setSelectedClass(null); }}
                                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'flora' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <Leaf className="w-4 h-4 mr-2" /> Flora
                            </button>
                        </div>

                        {/* Class Filters */}
                        <div className="space-y-2 mb-8">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Group</h3>
                            <button
                                onClick={() => setSelectedClass(null)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors border ${selectedClass === null ? 'bg-green-500/10 text-green-400 border-green-500/50' : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800'}`}
                            >
                                All Results
                            </button>

                            {activeTab === 'fauna' && (
                                <>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.MAMMALS)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.MAMMALS ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Mammals</button>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.BIRDS)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.BIRDS ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Birds</button>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.REPTILES)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.REPTILES ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Reptiles</button>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.AMPHIBIANS)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.AMPHIBIANS ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Amphibians</button>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.FISHES)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.FISHES ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Fishes</button>

                                    {/* Invertebrates - Expandable */}
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setExpandedFilters(prev => ({ ...prev, invertebrates: !prev.invertebrates }))}
                                                className="p-1 hover:bg-slate-800 rounded transition-colors"
                                            >
                                                {expandedFilters.invertebrates ? (
                                                    <ChevronDown className="w-4 h-4 text-slate-500" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4 text-slate-500" />
                                                )}
                                            </button>
                                            <button onClick={() => setSelectedClass(TAXON_IDS.INSECTS)} className={`flex-1 text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.INSECTS ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Invertebrates</button>
                                        </div>
                                        {expandedFilters.invertebrates && (
                                            <div className="ml-8 mt-1 space-y-1 border-l-2 border-slate-800 pl-3">
                                                <button onClick={() => setSelectedClass(TAXON_IDS.INSECTS)} className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedClass === TAXON_IDS.INSECTS ? 'bg-green-500/20 text-green-400 font-semibold' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}>Insects</button>
                                                <button onClick={() => setSelectedClass(TAXON_IDS.BUTTERFLIES)} className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedClass === TAXON_IDS.BUTTERFLIES ? 'bg-green-500/20 text-green-400 font-semibold' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}>Butterflies</button>
                                                <button onClick={() => setSelectedClass(TAXON_IDS.ARACHNIDS)} className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedClass === TAXON_IDS.ARACHNIDS ? 'bg-green-500/20 text-green-400 font-semibold' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}>Arachnids</button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {activeTab === 'flora' && (
                                <>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.FLOWERING_PLANTS)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.FLOWERING_PLANTS ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Flowering Plants</button>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.GRASSES)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.GRASSES ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Grasses</button>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.FERNS)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.FERNS ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Ferns</button>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.MOSSES)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.MOSSES ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Mosses</button>
                                    <button onClick={() => setSelectedClass(TAXON_IDS.CONIFERS)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${selectedClass === TAXON_IDS.CONIFERS ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Conifers</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-xs bg-slate-800 text-green-400 px-3 py-1 rounded-full border border-slate-700">REGION: {countyName || key}</span>
                        {selectedClass && <span className="font-mono text-xs bg-slate-800 text-blue-400 px-3 py-1 rounded-full border border-slate-700">FILTER ACTIVE</span>}
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Biodiversity Explorer</h1>
                    <p className="text-slate-400">Discovering {activeTab} in this region via iNaturalist.</p>

                    {/* Search Filter */}
                    <div className="relative mt-6">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search species by name..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <Loader2 className="w-12 h-12 animate-spin text-green-500" />
                    </div>
                ) : (
                    <>
                        {species.length === 0 ? (
                            <div className="text-center py-32 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
                                <Info className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-white text-lg font-bold mb-2">No Species Found</h3>
                                <p className="text-slate-500">Try adjusting your filters to see more results.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {species
                                    .filter((item) => {
                                        if (!searchTerm) return true;
                                        const commonName = item.taxon.preferred_common_name || '';
                                        const scientificName = item.taxon.name || '';
                                        const searchLower = searchTerm.toLowerCase();
                                        return (
                                            commonName.toLowerCase().includes(searchLower) ||
                                            scientificName.toLowerCase().includes(searchLower)
                                        );
                                    })
                                    .map((item) => {
                                        // iNaturalist Data Mapping
                                        const taxon = item.taxon;
                                        const commonName = taxon.preferred_common_name;
                                        const scientificName = taxon.name;
                                        const imageUrl = taxon.default_photo?.medium_url;

                                        // Format: "Common Name - (Scientific Name)"
                                        const shortScientific = scientificName ? `(${scientificName})` : '';
                                        let displayTitle = scientificName;

                                        if (commonName) {
                                            // Don't duplicate if common name is same as scientific
                                            if (commonName.toLowerCase() !== scientificName.toLowerCase()) {
                                                displayTitle = `${commonName} - ${shortScientific}`;
                                            }
                                        }

                                        return (
                                            <div
                                                key={taxon.id}
                                                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/20 transition-all group flex flex-col cursor-pointer"
                                                onClick={() => setSelectedSpecies({ key: taxon.id, commonName: displayTitle, image: imageUrl })}
                                            >
                                                <div className="relative h-56 bg-slate-950 overflow-hidden">
                                                    {imageUrl ? (
                                                        <>
                                                            {/* Blurred background */}
                                                            <div
                                                                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40"
                                                                style={{ backgroundImage: `url(${imageUrl})` }}
                                                            />
                                                            {/* Main image */}
                                                            <img
                                                                src={imageUrl}
                                                                alt={displayTitle}
                                                                className="relative w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 z-10"
                                                                loading="lazy"
                                                            />
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full">
                                                            <Camera className="w-16 h-16 text-slate-800" />
                                                        </div>
                                                    )}

                                                    {/* Icon overlay */}
                                                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 text-white shadow-xl z-20">
                                                        {getIconForClass(taxon)}
                                                    </div>
                                                </div>

                                                <div className="p-5 flex-1 flex flex-col">
                                                    <div className="mb-4">
                                                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-green-400 transition-colors">{displayTitle}</h3>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 mt-auto text-xs">
                                                        <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                                                            <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px]">Observations</span>
                                                            <span className="text-slate-300 font-medium truncate block">{item.count || 'N/A'}</span>
                                                        </div>
                                                        <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                                                            <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px]">Family</span>
                                                            <span className="text-slate-300 font-medium truncate block">{taxon.iconic_taxon_name || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={(e) => { e.stopPropagation(); window.open(`https://www.inaturalist.org/taxa/${taxon.id}`, '_blank'); }}
                                                    className="p-3 bg-slate-950 text-center text-xs font-bold text-slate-500 hover:text-white hover:bg-green-600 transition-colors uppercase tracking-wider flex items-center justify-center gap-2 border-t border-slate-800"
                                                >
                                                    View on iNaturalist <ExternalLink className="w-3 h-3" />
                                                </button>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Modal */}
            {selectedSpecies && (
                <SpeciesModal
                    speciesKey={selectedSpecies.key} // This is now a Taxon ID
                    commonName={selectedSpecies.commonName}
                    image={selectedSpecies.image}
                    onClose={() => setSelectedSpecies(null)}
                />
            )}
        </div>
    );
};

export default CountyDetails;
