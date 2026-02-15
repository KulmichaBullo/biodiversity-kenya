import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { inaturalistApi } from '../services/inaturalist';
import ImageUpload from '../components/ImageUpload';
import SpeciesModal from '../components/SpeciesModal';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { ListSkeleton } from '../components/Skeleton';

const Identify = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedSpecies, setSelectedSpecies] = useState(null);

    const handleImageSelect = (file) => {
        setSelectedImage(file);
        setResults([]);
        setError(null);
    };

    const handleClear = () => {
        setSelectedImage(null);
        setResults([]);
        setError(null);
    };

    const handleIdentify = async () => {
        if (!selectedImage) return;

        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const data = await inaturalistApi.identifyImage(selectedImage);

            if (data.results && data.results.length > 0) {
                setResults(data.results.slice(0, 10)); // Top 10 results
            } else {
                setError('No species identified. Try a clearer image of wildlife.');
            }
        } catch (err) {
            console.error('Identification error:', err);
            setError('Failed to identify species. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-12">
            {/* Header */}
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-slate-400 hover:text-green-400 transition-colors group mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500/10 rounded-2xl border border-green-500/30">
                        <Sparkles className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Identify Species</h1>
                        <p className="text-slate-400 mt-1">Upload a photo to discover what species it is</p>
                    </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl mt-4">
                    <p className="text-blue-300 text-sm flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>For best results, upload clear photos of wildlife or plants found in Kenya. The AI works best with images showing distinctive features.</span>
                    </p>
                </div>
            </div>

            {/* Upload Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Upload Image</h2>
                    <ImageUpload onImageSelect={handleImageSelect} onClear={handleClear} />

                    {selectedImage && !loading && results.length === 0 && (
                        <button
                            onClick={handleIdentify}
                            className="w-full mt-6 px-6 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Identify Species
                        </button>
                    )}
                </div>

                {/* Instructions */}
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 h-fit">
                    <h3 className="text-lg font-bold text-white mb-4">How it Works</h3>
                    <ol className="space-y-3 text-slate-300">
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                            <span>Upload or drag & drop a photo of wildlife or plants</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                            <span>Click "Identify Species" to analyze the image</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                            <span>Review AI predictions with confidence scores</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                            <span>Click on any result to see detailed information</span>
                        </li>
                    </ol>

                    <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <p className="text-xs text-slate-400">
                            <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                            Powered by iNaturalist's AI trained on millions of wildlife observations
                        </p>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="py-12">
                    <ListSkeleton count={4} />
                    <p className="text-slate-400 text-center mt-8 animate-pulse text-lg">Analyzing image through neural networks...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl">
                    <p className="text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </p>
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-green-500" />
                        Identification Results
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {results.map((result, index) => {
                            const taxon = result.taxon;
                            const score = result.combined_score || result.vision_score || result.frequency_score || 0;
                            const confidence = Math.round(score * 100);

                            const commonName = taxon.preferred_common_name;
                            const scientificName = taxon.name;
                            const imageUrl = taxon.default_photo?.medium_url;

                            const shortScientific = scientificName ? `(${scientificName})` : '';
                            let displayTitle = scientificName;
                            if (commonName && commonName.toLowerCase() !== scientificName.toLowerCase()) {
                                displayTitle = `${commonName} - ${shortScientific}`;
                            }

                            return (
                                <div
                                    key={taxon.id}
                                    className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/20 transition-all group cursor-pointer"
                                    onClick={() => setSelectedSpecies({ key: taxon.id, commonName: displayTitle, image: imageUrl })}
                                >
                                    <div className="relative h-48 bg-slate-950">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={displayTitle}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Sparkles className="w-12 h-12 text-slate-800" />
                                            </div>
                                        )}

                                        {/* Confidence Badge */}
                                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                                            <span className="text-white font-bold text-sm">{confidence}%</span>
                                        </div>

                                        {/* Rank Badge */}
                                        {index === 0 && (
                                            <div className="absolute top-3 left-3 bg-green-500 px-2 py-1 rounded-lg">
                                                <span className="text-white font-bold text-xs">Best Match</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-sm font-bold text-white mb-1 line-clamp-2 group-hover:text-green-400 transition-colors">
                                            {displayTitle}
                                        </h3>
                                        <p className="text-xs text-slate-500">Rank: {taxon.rank}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Modal */}
            {selectedSpecies && (
                <SpeciesModal
                    speciesKey={selectedSpecies.key}
                    commonName={selectedSpecies.commonName}
                    image={selectedSpecies.image}
                    onClose={() => setSelectedSpecies(null)}
                />
            )}
        </div>
    );
};

export default Identify;
