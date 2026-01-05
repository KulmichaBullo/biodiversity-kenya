import React, { useState, useEffect, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { geoCentroid } from "d3-geo";

const GEO_URL = "https://raw.githubusercontent.com/mikelmaron/kenya-election-data/master/data/counties.geojson";

const KenyaMap = ({ onSelectCounty, selectedCountyName }) => {
    const [position, setPosition] = useState({ coordinates: [37.9062, -0.0236], zoom: 1 });
    const [geographiesData, setGeographiesData] = useState(null);

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
                    minZoom={1}
                    maxZoom={10}
                >
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) => {
                            // Capture data once for zoom logic
                            if (!geographiesData) setGeographiesData(geographies);

                            return geographies.map((geo) => {
                                const countyName = geo.properties.COUNTY_NAM || geo.properties.Name || geo.properties.name || "Unknown County";
                                const isSelected = selectedCountyName && countyName.toLowerCase() === selectedCountyName.toLowerCase();

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        data-tooltip-id="map-tooltip"
                                        data-tooltip-content={countyName}
                                        onClick={() => onSelectCounty(countyName)}
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
                    className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700"
                    onClick={() => setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.2 }))}
                >+</button>
                <button
                    className="bg-slate-800 p-2 rounded-lg text-white hover:bg-slate-700 border border-slate-700"
                    onClick={() => setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.2 }))}
                >-</button>
            </div>
        </div>
    );
};

export default KenyaMap;
