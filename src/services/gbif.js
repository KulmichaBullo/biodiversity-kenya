import axios from 'axios';

const BASE_URL = 'https://api.gbif.org/v1';

// Kingdom keys
export const KINGDOMS = {
    ANIMALS: 1,
    PLANTS: 6,
};

// Class Keys for filtering
export const CLASS_KEYS = {
    MAMMALS: 359,
    BIRDS: 212,
    REPTILES: 358,
    AMPHIBIANS: 131,
    FISHES: 204, // Ray-finned fishes (Actinopterygii) as a proxy for "Fish" often used
    INSECTS: 216,
    ARACHNIDS: 367,
    // Plants
    LILIOPSIDA: 196, // Monocots
    MAGNOLIOPSIDA: 220, // Dicots
};

export const gbifApi = {
    // Get all administrative regions for Kenya (Level 1 - Counties)
    getKenyanCounties: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/geocode/gadm/browse/KEN`);
            return response.data;
        } catch (error) {
            console.error('Error fetching counties:', error);
            return [];
        }
    },

    // Search occurrences with enhanced filters
    getOccurrences: async ({ countyGid, kingdomKey, classKey, limit = 20, offset = 0, hasImage = true }) => {
        try {
            const params = {
                country: 'KE',
                gadmGid: countyGid,
                limit,
                offset,
            };

            if (kingdomKey) {
                params.kingdomKey = kingdomKey;
            }

            if (classKey) {
                params.classKey = classKey;
            }

            if (hasImage) {
                params.mediaType = 'StillImage';
            }

            const response = await axios.get(`${BASE_URL}/occurrence/search`, { params });

            // Post-process to try and populate common names if they are part of the detailed record
            // Note: Search often returns minimal info. We might need individual lookups if vernacularName isn't present.
            // However, doing 20 individual lookups is slow. 
            // Strategy: Return as is, component will display "scientificName" if common name missing.
            return response.data;
        } catch (error) {
            console.error('Error fetching occurrences:', error);
            return { count: 0, results: [] };
        }
    },

    // Get species details (including vernacular names)
    getSpecies: async (key) => {
        try {
            const response = await axios.get(`${BASE_URL}/species/${key}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching species:', error);
            return null;
        }
    }
};
