import axios from 'axios';

const BASE_URL = 'https://api.inaturalist.org/v1';

// iNaturalist Taxon IDs (Verified)
export const TAXON_IDS = {
    // Fauna - Vertebrates
    ANIMALS: 1,
    MAMMALS: 40151,      // Mammalia
    BIRDS: 3,            // Aves
    RAPTORS: 20422,      // Accipitriformes (Hawks, Eagles)
    WATERFOWL: 6888,     // Anseriformes (Ducks, Geese)
    SONGBIRDS: 20764,    // Passeriformes (Perching birds)
    REPTILES: 26036,     // Reptilia
    AMPHIBIANS: 20979,   // Amphibia
    FISHES: 47178,       // Actinopterygii (Ray-finned fishes)

    // Fauna - Invertebrates
    INSECTS: 47158,      // Insecta
    BEETLES: 47208,      // Coleoptera
    FLIES: 47822,        // Diptera
    BEES_WASPS: 47201,   // Hymenoptera
    ARACHNIDS: 47119,    // Arachnida (Spiders, Scorpions)
    BUTTERFLIES: 47224,  // Lepidoptera (Butterflies & Moths)
    MOLLUSCS: 47115,     // Mollusca (Snails, Slugs, Octopuses)
    CRUSTACEANS: 85493,  // Crustacea (Crabs, Lobsters, Shrimp)

    // Flora
    PLANTS: 47126,              // Plantae
    FLOWERING_PLANTS: 47125,    // Magnoliophyta (Flowering plants)
    TREES: 47125,               // Using flowering plants (most trees flower)
    GRASSES: 47162,             // Poaceae (Grass family)
    FERNS: 121943,              // Polypodiopsida (Ferns)
    MOSSES: 311249,             // Bryophyta (Mosses)
    CONIFERS: 136329,           // Pinophyta (Conifers)
    SHRUBS: 47125,              // Also using flowering plants
};

export const inaturalistApi = {
    // Helper: Search for a place ID by name (e.g., "Nairobi")
    searchPlace: async (query) => {
        try {
            const response = await axios.get(`${BASE_URL}/places/autocomplete`, {
                params: { q: query, per_page: 5 }
            });
            // Try to find an exact match or a match that contains "County" and "Kenya"
            // Usually the first result is best, but we favor Kenya results
            const kenyanPlace = response.data.results.find(p => p.display_name.includes('Kenya'));
            return kenyanPlace ? kenyanPlace.id : (response.data.results[0]?.id || null);
        } catch (error) {
            console.error("Error searching place:", error);
            return null;
        }
    },

    // Get observations (species occurrences)
    getObservations: async ({ countyName, taxonId, limit = 50, page = 1 }) => {
        try {
            // 1. Get Place ID for the County
            const placeId = await inaturalistApi.searchPlace(countyName);

            if (!placeId) {
                console.warn(`Place ID not found for ${countyName}`);
                return { results: [] };
            }

            // 2. Fetch Observations
            const params = {
                place_id: placeId,
                taxon_id: taxonId,
                per_page: limit,
                page: page,
                verifiable: true,    // verifiable (has date, location, evidence)
                'photos': true,      // must have photos
                order_by: 'observations_count', // most observed species first (effectively "popular")
                hrank: 'species',    // show species level primarily
                lrank: 'species'
            };

            // Note: iNaturalist "observations" endpoint lists individual sightings.
            // Often we want "species_counts" endpoint for a list of distinct species in that area.
            // Let's use species_counts for a better "explorer" view.

            const response = await axios.get(`${BASE_URL}/observations/species_counts`, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching observations:", error);
            return { results: [] };
        }
    },

    // Get single species details
    getTaxon: async (taxonId) => {
        try {
            const response = await axios.get(`${BASE_URL}/taxa/${taxonId}`);
            return response.data.results[0];
        } catch (error) {
            console.error("Error fetching taxon:", error);
            return null;
        }
    },

    // Identify species from image using Computer Vision
    identifyImage: async (imageFile, latitude = -1.286389, longitude = 36.817223) => {
        try {
            // Default coords are Nairobi, Kenya
            const formData = new FormData();
            formData.append('image', imageFile);

            // Add location to improve accuracy
            if (latitude && longitude) {
                formData.append('lat', latitude);
                formData.append('lng', longitude);
            }

            const response = await axios.post(
                `${BASE_URL}/computervision/score_image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error identifying image:", error);
            return { results: [] };
        }
    }
};
