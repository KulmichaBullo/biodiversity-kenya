// src/data/countyImages.js

// Mapping of county names to their unique biodiversity images
const countyImageMap = {
    // Coastal & North Eastern
    'Mombasa': '/images/counties/mombasa_county.png',
    'Kwale': '/images/counties/kwale_county_1771153248313.png',
    'Kilifi': '/images/counties/kilifi_county_1771153268512.png',
    'Tana River': '/images/counties/tana_river_county.png',
    'Lamu': '/images/counties/lamu_county.png',
    'Taita-Taveta': '/images/counties/taita_taveta_county.png',
    'Garissa': '/images/counties/garissa_county.png',
    'Wajir': '/images/counties/wajir_county.png',
    'Mandera': '/images/counties/mandera_county.png',

    // Eastern & Central
    'Marsabit': '/images/counties/marsabit_county.png',
    'Isiolo': '/images/counties/isiolo_county_1771153339146.png',
    'Meru': '/images/counties/meru_county_1771153382502.png',
    'Tharaka-Nithi': '/images/counties/tharaka_nithi_county.png',
    'Embu': '/images/counties/embu_county.png',
    'Kitui': '/images/counties/kitui_county_1771153416731.png',
    'Machakos': '/images/counties/machakos_county_1771153433419.png',
    'Makueni': '/images/counties/makueni_county_1771153470574.png',
    'Nyandarua': '/images/counties/nyandarua_county_1771153486663.png',
    'Nyeri': '/images/counties/nyeri_county_1771153507765.png',
    'Kirinyaga': '/images/counties/kirinyaga_county_1771153528642.png',
    'Murang\'a': '/images/counties/murang_a_county.png',
    'Kiambu': '/images/counties/kiambu_county_1771153579272.png',

    // Rift Valley
    'Turkana': '/images/counties/turkana_county_1771153605224.png',
    'West Pokot': '/images/counties/west_pokot_county_1771153620335.png',
    'Samburu': '/images/counties/samburu_county_1771153637549.png',
    'Trans-Nzoia': '/images/counties/trans_nzoia_county.png',
    'Uasin Gishu': '/images/counties/uasin_gishu_county.png',
    'Elgeyo-Marakwet': '/images/counties/elgeyo_marakwet_county.png',
    'Nandi': '/images/counties/nandi_county.png',
    'Baringo': '/images/counties/baringo_county.png',
    'Laikipia': '/images/counties/laikipia_county.png',
    'Nakuru': '/images/counties/nakuru_county.png',
    'Narok': '/images/counties/narok_county.png',
    'Kajiado': '/images/counties/kajiado_county.png',
    'Kericho': '/images/counties/kericho_county.png',
    'Bomet': '/images/counties/bomet_county.png',

    // Western & Nyanza
    'Kakamega': '/images/counties/kakamega_county.png',
    'Vihiga': '/images/counties/vihiga_county.png',
    'Bungoma': '/images/counties/bungoma_county.png',
    'Busia': '/images/counties/busia_county.png',
    'Siaya': '/images/counties/siaya_county.png',
    'Kisumu': '/images/counties/kisumu_county.png',
    'Homa Bay': '/images/counties/homa_bay_county.png',
    'Migori': '/images/counties/migori_county.png',
    'Kisii': '/images/counties/kisii_county.png',
    'Nyamira': '/images/counties/nyamira_county.png',
    'Nairobi': '/images/counties/nairobi_county.png',
};

// Fixed set of high-quality nature images from Unsplash to use as fallback placeholders
const stockImages = [
    "https://images.unsplash.com/photo-1517309230475-6736d9149255?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523544268675-dcd4d5e57519?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489396160836-2c99c977e970?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1627403487053-3398c8c73bd9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1547471080-7541f9d2de60?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552560880-2c7da5772bdd?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570989676648-52fb2d3550e5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop",
];

/**
 * Returns the appropriate image for a given county name.
 * First checks for a custom county image, then falls back to stock images.
 * @param {string} countyName 
 * @returns {string} URL of the image
 */
export const getCountyImage = (countyName) => {
    if (!countyName) return stockImages[0];

    // Try to find exact match in county map
    if (countyImageMap[countyName]) {
        return countyImageMap[countyName];
    }

    // Fallback to hash-based stock image selection
    let hash = 0;
    for (let i = 0; i < countyName.length; i++) {
        hash = countyName.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % stockImages.length;
    return stockImages[index];
};
