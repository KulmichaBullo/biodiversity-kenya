// src/data/countyImages.js

// Fixed set of high-quality nature images from Unsplash to use as placeholders
// for the county cards. This ensures the app looks good even without custom assets.
const stockImages = [
    "https://images.unsplash.com/photo-1517309230475-6736d9149255?q=80&w=800&auto=format&fit=crop", // General Kenya Landscape
    "https://images.unsplash.com/photo-1523544268675-dcd4d5e57519?q=80&w=800&auto=format&fit=crop", // Savanna
    "https://images.unsplash.com/photo-1489396160836-2c99c977e970?q=80&w=800&auto=format&fit=crop", // Wildlife - Elephants
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop", // Safari
    "https://images.unsplash.com/photo-1627403487053-3398c8c73bd9?q=80&w=800&auto=format&fit=crop", // Green Hills
    "https://images.unsplash.com/photo-1547471080-7541f9d2de60?q=80&w=800&auto=format&fit=crop", // Mount Kenyaish
    "https://images.unsplash.com/photo-1552560880-2c7da5772bdd?q=80&w=800&auto=format&fit=crop", // Lions
    "https://images.unsplash.com/photo-1570989676648-52fb2d3550e5?q=80&w=800&auto=format&fit=crop", // Giraffe
    "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop", // Zebra
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop", // Forest
];

/**
 * Returns a consistent placeholder image for a given county name.
 * Uses a simple hash of the name to select an image from the stock list.
 * @param {string} countyName 
 * @returns {string} URL of the image
 */
export const getCountyImage = (countyName) => {
    if (!countyName) return stockImages[0];

    // Simple hash to pick an image consistently for a given county name
    let hash = 0;
    for (let i = 0; i < countyName.length; i++) {
        hash = countyName.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % stockImages.length;
    return stockImages[index];
};
