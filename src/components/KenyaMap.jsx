import React, { useState, useEffect, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { geoCentroid } from "d3-geo";

const GEO_URL = "https://raw.githubusercontent.com/mikelmaron/kenya-election-data/master/data/counties.geojson";

const KenyaMap = ({ onSelectCounty, selectedCountyName }) => {
    const [position, setPosition] = useState({ coordinates: [37.9062, -0.0236], zoom: 1 });
    const [geographiesData, setGeographiesData] = useState(null);
    // Pending selection: first tap selects (highlights), second tap (or confirm) opens.
    const [pendingSelect, setPendingSelect] = useState(null);

    // When selectedCountyName changes, find the feature and zoom to it
    useEffect(() => {
        if (selectedCountyName && geographiesData) {
            const feature = geographiesData.find(d => {
                const name = d.properties.COUNTY_NAM || d.properties.Name || d.properties.name;
                return name && name.toLowerCase() === selectedCountyName.toLowerCase();
            });

            if (feature) {
                const centroid = geoCentroid(feature);
                setPosition({ coordinates: centroid, zoom: 4 });
            }
        } else if (!selectedCountyName) {
            // Reset zoom
            setPosition({ coordinates: [37.9062, -0.0236], zoom: 1 });
        }
    }, [selectedCountyName, geographiesData]);

    const handleMoveEnd = (position) => {
        setPosition(position);
    };

    // Prevent the map from hijacking the mouse wheel (so page scroll works on desktop).
    // Only allow zoom via drag/pan and the +/- buttons below.
    const filterZoomEvent = (e) => {
        // Block wheel events; allow ctrl+wheel (pinch-zoom trackpads) and dblclick to pan-zoom if desired
        if (e.type === 'wheel') return false;
        return true;
    };

    // Tap behavior: first tap selects (highlights), tapping the SAME county again opens it.
    // A mis-tap only selects — it never navigates until the user commits (via second tap or the confirm button).
    const handleCountyClick = (countyName) => {
        if (pendingSelect && pendingSelect.toLowerCase() === countyName.toLowerCase()) {
            // Second tap on the already-selected county -> open it.
            setPendingSelect(null);
            onSelectCounty(countyName);
        } else {
            // First tap (or tap on a different county) -> just select/highlight.
            setPendingSelect(countyName);
        }
    };

    const highlightName = pendingSelect || selectedCountyName;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 3500,
                    center: [37.9062, -0.0236]
                }}
                className="w-full h-full"
            >
                <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    onMoveEnd={handleMoveEnd}
                    filterZoomEvent={filterZoomEvent}
                    minZoom={1}
                    maxZoom={10}
                >
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) => {
                            // Capture data once for zoom logic
                            if (!geographiesData) setGeographiesData(geographies);

                            return geographies.map((geo) => {
                                const countyName = geo.properties.COUNTY_NAM || geo.properties.Name || geo.properties.name || "Unknown County";
                                const isSelected = highlightName && countyName.toLowerCase() === highlightName.toLowerCase();

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        data-tooltip-id="map-tooltip"
                                        data-tooltip-content={countyName}
                                        onClick={() => handleCountyClick(countyName)}
                                        style={{
                                            default: {
                                                fill: isSelected ? "#22c55e" : "#1e293b", // Green if selected, Slate 800 default
                                                stroke: "#334155",
                                                strokeWidth: 0.5,
                                                outline: "none",
                                                transition: "all 250ms"
                                            },
                                            hover: {
                                                fill: "#22c55e",
                                                stroke: "#fff",
                                                strokeWidth: 1,
                                                outline: "none",
                                                cursor: "pointer"
                                            },
                                            pressed: {
                                                fill: "#15803d",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                );
                            });
                        }}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            <Tooltip id="map-tooltip" className="z-50 !bg-slate-900 !text-white !px-3 !py-1 !rounded-lg !text-xs !border !border-slate-700 !opacity-100" />

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                    className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 w-9 h-9 flex items-center justify-center"
                    onClick={() => setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.2 }))}
                >+</button>
                <button
                    className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700 w-9 h-9 flex items-center justify-center"
                    onClick={() => setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.2 }))}
                >-</button>
            </div>

            {/* Pending-selection confirm bar: appears after a county is tapped.
                Tap the same county again OR this button to open. Prevents accidental navigation. */}
            {pendingSelect && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(92%,22rem)] glass rounded-2xl border border-green-500/40 px-4 py-3 flex items-center gap-3 shadow-2xl shadow-black/50 animate-[fadeIn_200ms_ease]">
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-green-300/80 font-semibold">Selected</p>
                        <p className="text-white font-semibold text-sm truncate">{pendingSelect}</p>
                    </div>
                    <button
                        onClick={() => { const n = pendingSelect; setPendingSelect(null); onSelectCounty(n); }}
                        className="tap flex-shrink-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-green-900/40"
                    >
                        Open
                    </button>
                    <button
                        onClick={() => setPendingSelect(null)}
                        aria-label="Cancel selection"
                        className="tap flex-shrink-0 w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-lg leading-none transition-all"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default KenyaMap;
