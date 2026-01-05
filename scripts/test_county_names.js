// scripts/test_county_names.js
import axios from 'axios';

// Mock the GBIF API behavior to get the list of counties
// We will fetch the actual list from GBIF API directly here
const GBIF_URL = 'https://api.gbif.org/v1/geocode/gadm/browse/KEN';
const INAT_URL = 'https://api.inaturalist.org/v1/places/autocomplete';

async function checkCounties() {
    console.log("Fetching full county list from GBIF (GADM)...");

    try {
        const response = await axios.get(GBIF_URL);
        const counties = response.data;
        console.log(`Found ${counties.length} counties to check.\n`);

        const failures = [];
        const success = [];

        // Check each county
        for (const county of counties) {
            // console.log(`Checking: ${county.name} (${county.id})...`);

            try {
                // Search iNat
                const inatRes = await axios.get(INAT_URL, {
                    params: { q: county.name, per_page: 3 }
                });

                // Algorithm to pick best match (from our service)
                const kenyanPlace = inatRes.data.results.find(p => p.display_name.includes('Kenya'));
                const bestMatch = kenyanPlace || inatRes.data.results[0];

                if (bestMatch) {
                    // console.log(`   ✅ OK: "${county.name}" -> Found "${bestMatch.name}" (ID: ${bestMatch.id})`);
                    success.push({ original: county.name, found: bestMatch.name, id: bestMatch.id });
                } else {
                    console.error(`   ❌ FAIL: "${county.name}" -> No match found.`);
                    failures.push({ original: county.name, id: county.id });
                }

                // Be nice to API
                await new Promise(r => setTimeout(r, 200));

            } catch (err) {
                console.error(`   ❌ ERROR: "${county.name}" -> Request failed: ${err.message}`);
                failures.push({ original: county.name, id: county.id, error: err.message });
            }
        }

        console.log("\n================ REPORT ================");
        console.log(`Verified: ${success.length}/${counties.length}`);
        console.log(`Failures: ${failures.length}/${counties.length}`);

        if (failures.length > 0) {
            console.log("\nList of Counties needing Name Mapping:");
            failures.forEach(f => console.log(`- "${f.original}" (GID: ${f.id})`));
        } else {
            console.log("\nAll counties map successfully!");
        }

    } catch (error) {
        console.error("Fatal error:", error);
    }
}

checkCounties();
