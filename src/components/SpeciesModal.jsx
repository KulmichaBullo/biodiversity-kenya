import React, { useEffect, useState } from 'react';
import { inaturalistApi } from '../services/inaturalist';
import { X, ExternalLink, Info, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const SpeciesModal = ({ speciesKey, commonName, image, onClose }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([image]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = await inaturalistApi.getTaxon(speciesKey);
                setDetails(data);

                // Get multiple images from taxon_photos
                if (data?.taxon_photos && data.taxon_photos.length > 0) {
                    const photoUrls = data.taxon_photos
                        .slice(0, 10) // Get up to 10 photos
                        .map(photo => photo.photo.large_url || photo.photo.medium_url)
                        .filter(url => !!url);

                    if (photoUrls.length > 0) {
                        setImages(photoUrls);
                    }
                }
            } catch (error) {
                console.error("Error fetching species details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (speciesKey) {
            fetchDetails();
        }
    }, [speciesKey]);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!speciesKey) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-red-500/80 text-white rounded-full backdrop-blur-xl border border-white/10 transition-all group"
                >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Image Gallery Carousel */}
                    <div className="relative h-80 md:h-[400px] bg-black overflow-hidden group/gallery">
                        {loading && !images[0] ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                            </div>
                        ) : images.length > 0 ? (
                            <>
                                {/* Blurred background effect */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-40 scale-110 transition-all duration-700"
                                    style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                                />

                                {/* Main image */}
                                <img
                                    src={images[currentImageIndex]}
                                    alt={commonName}
                                    className="relative w-full h-full object-contain z-10 p-4 transition-all duration-500"
                                />

                                {/* Navigation arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md border border-white/5 transition-all opacity-0 group-hover/gallery:opacity-100"
                                        >
                                            <ChevronLeft className="w-8 h-8" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md border border-white/5 transition-all opacity-0 group-hover/gallery:opacity-100"
                                        >
                                            <ChevronRight className="w-8 h-8" />
                                        </button>

                                        {/* Pagination indicator */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-5 py-2.5 bg-black/40 backdrop-blur-xl rounded-full text-white/90 text-sm font-medium border border-white/10 tracking-widest">
                                            {currentImageIndex + 1} <span className="text-white/40 mx-1">/</span> {images.length}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-700 bg-slate-950">
                                <Camera className="w-20 h-20 mb-4 opacity-20" />
                                <p className="text-lg font-medium opacity-40">No preview gallery available</p>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8">
                        {loading && !details ? (
                            <div className="animate-pulse space-y-6">
                                <div className="space-y-2">
                                    <div className="h-8 bg-white/5 rounded-xl w-3/4"></div>
                                    <div className="h-4 bg-white/5 rounded-xl w-1/4"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[1, 2].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl"></div>)}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <header>
                                    <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                                        {commonName}
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm font-bold border border-green-500/20 uppercase tracking-widest">
                                            {details?.rank || 'Species'}
                                        </span>
                                        <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-bold border border-blue-500/20 uppercase tracking-widest">
                                            {details?.iconic_taxon_name || 'Taxon'}
                                        </span>
                                    </div>
                                </header>

                                {/* Taxonomy Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.07] transition-colors">
                                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-1">Status</span>
                                        <span className="text-white font-bold text-sm">{details?.extinct ? 'Extinct' : 'Extant'}</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.07] transition-colors">
                                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-1">Atlas Rank</span>
                                        <span className="text-white font-bold text-sm">Common</span>
                                    </div>
                                </div>

                                {/* Wikipedia Summary */}
                                {details?.wikipedia_summary && (
                                    <div className="bg-slate-800/30 border border-slate-800 p-5 rounded-2xl">
                                        <h4 className="flex items-center text-lg font-bold text-white mb-3">
                                            <Info className="w-4 h-4 mr-2 text-green-400" />
                                            Overview
                                        </h4>
                                        <div
                                            className="text-slate-400 text-sm leading-relaxed dangerously-html"
                                            dangerouslySetInnerHTML={{ __html: details.wikipedia_summary }}
                                        />
                                    </div>
                                )}

                                {/* Action Footer */}
                                <footer className="pt-6 flex flex-col md:flex-row gap-4">
                                    <a
                                        href={`https://www.inaturalist.org/taxa/${details?.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-500 text-white px-6 py-3.5 rounded-xl font-black text-base transition-all shadow-xl shadow-green-900/20 group/btn"
                                    >
                                        Explore on iNaturalist
                                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                </footer>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeciesModal;
