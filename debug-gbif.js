import { gbifApi } from './src/services/gbif.js';

async function testApi() {
    console.log("Testing getKenyanCounties...");
    try {
        const counties = await gbifApi.getKenyanCounties();
        console.log("Counties Response Type:", typeof counties);
        console.log("Counties Length:", counties.length);
        if (counties.length > 0) {
            console.log("First County Sample:", JSON.stringify(counties[0], null, 2));
        } else {
            console.log("Counties list is empty.");
        }
    } catch (error) {
        console.error("Error in testApi:", error);
    }
}

testApi();
