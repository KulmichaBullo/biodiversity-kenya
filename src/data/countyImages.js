// src/data/countyImages.js
//
// County -> top biodiversity imagery, curated from iNaturalist's real
// most-observed species per county (the same API the app uses for the
// County Details explorer). Each county resolves to ONE coherent hero
// species: the displayed photo AND its caption always come from the
// same species, so the image can never be mislabeled.
//
// getCountyImage(name) returns an object:
//   { url, caption, kingdom, scientific, isFallback }
//   - caption: e.g. "African baobab (Flora)" or "Hadada Ibis (Fauna)"
//   - kingdom: 'fauna' | 'flora' | null
//   - scientific: the species' scientific name
//   - isFallback: true only if no real species photo was available

// Curated top species per county (image + caption from the SAME species).
const countyHeroMap = {
    "Baringo": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/89723844/medium.jpg",
        name: "Lesser Flamingo",
        scientific: "Phoeniconaias minor",
        kingdom: "fauna",
        observations: 100
    },
    "Bomet": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/735535/medium.jpg",
        name: "Little Pansy",
        scientific: "Junonia sophia",
        kingdom: "fauna",
        observations: 8
    },
    "Bungoma": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/187006756/medium.jpeg",
        name: "mouse-ear cress",
        scientific: "Arabidopsis thaliana",
        kingdom: "flora",
        observations: 26
    },
    "Busia": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/10995644/medium.jpg",
        name: "Silverleaf Desmodium",
        scientific: "Desmodium uncinatum",
        kingdom: "flora",
        observations: 14
    },
    "Elgeyo-Marakwet": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/779488/medium.jpg",
        name: "Baglafecht Weaver",
        scientific: "Ploceus baglafecht",
        kingdom: "fauna",
        observations: 17
    },
    "Embu": {
        url: "https://static.inaturalist.org/photos/2369526/medium.jpg",
        name: "Western Honey Bee",
        scientific: "Apis mellifera",
        kingdom: "fauna",
        observations: 22
    },
    "Garissa": {
        url: "https://static.inaturalist.org/photos/252630897/medium.jpg",
        name: "Yellow Baboon",
        scientific: "Papio cynocephalus",
        kingdom: "fauna",
        observations: 5
    },
    "Homa Bay": {
        url: "https://static.inaturalist.org/photos/477005688/medium.jpeg",
        name: "Hamerkop",
        scientific: "Scopus umbretta",
        kingdom: "fauna",
        observations: 27
    },
    "Isiolo": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
        name: "African Savanna Elephant",
        scientific: "Loxodonta africana",
        kingdom: "fauna",
        observations: 304
    },
    "Kajiado": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
        name: "African Savanna Elephant",
        scientific: "Loxodonta africana",
        kingdom: "fauna",
        observations: 996
    },
    "Kakamega": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/48842628/medium.jpeg",
        name: "Gregori’s Brown Pansy",
        scientific: "Junonia gregorii",
        kingdom: "fauna",
        observations: 87
    },
    "Kericho": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/47225717/medium.jpeg",
        name: "Vervet Monkey",
        scientific: "Chlorocebus pygerythrus",
        kingdom: "fauna",
        observations: 5
    },
    "Kiambu": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/12832964/medium.jpg",
        name: "Helmeted Chameleon",
        scientific: "Trioceros hoehnelii",
        kingdom: "fauna",
        observations: 83
    },
    "Kilifi": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/156903375/medium.jpg",
        name: "Kenyan Rock Agama",
        scientific: "Agama lionotus",
        kingdom: "fauna",
        observations: 223
    },
    "Kirinyaga": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/779488/medium.jpg",
        name: "Baglafecht Weaver",
        scientific: "Ploceus baglafecht",
        kingdom: "fauna",
        observations: 33
    },
    "Kisii": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/625159/medium.jpg",
        name: "Greenleaf Ticktrefoil",
        scientific: "Desmodium intortum",
        kingdom: "flora",
        observations: 16
    },
    "Kisumu": {
        url: "https://static.inaturalist.org/photos/477005688/medium.jpeg",
        name: "Hamerkop",
        scientific: "Scopus umbretta",
        kingdom: "fauna",
        observations: 41
    },
    "Kitui": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
        name: "African Savanna Elephant",
        scientific: "Loxodonta africana",
        kingdom: "fauna",
        observations: 92
    },
    "Kwale": {
        url: "https://static.inaturalist.org/photos/107063651/medium.jpg",
        name: "Flap-necked Chameleon",
        scientific: "Chamaeleo dilepis",
        kingdom: "fauna",
        observations: 1989
    },
    "Laikipia": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
        name: "African Savanna Elephant",
        scientific: "Loxodonta africana",
        kingdom: "fauna",
        observations: 445
    },
    "Lamu": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/5856927/medium.jpg",
        name: "White-headed Dwarf Gecko",
        scientific: "Lygodactylus mombasicus",
        kingdom: "fauna",
        observations: 13
    },
    "Machakos": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/329009302/medium.jpg",
        name: "Superb Starling",
        scientific: "Lamprotornis superbus",
        kingdom: "fauna",
        observations: 42
    },
    "Makueni": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/249827419/medium.jpeg",
        name: "African baobab",
        scientific: "Adansonia digitata",
        kingdom: "flora",
        observations: 46
    },
    "Mandera": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/95521890/medium.jpeg",
        name: "Pallid Thicktail Scorpion",
        scientific: "Parabuthus pallidus",
        kingdom: "fauna",
        observations: 7
    },
    "Marsabit": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/260834331/medium.jpg",
        name: "Heuglin's Bustard",
        scientific: "Neotis heuglinii",
        kingdom: "fauna",
        observations: 28
    },
    "Meru": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/171937969/medium.jpeg",
        name: "Dendrosenecio keniodendron",
        scientific: "Dendrosenecio keniodendron",
        kingdom: "flora",
        observations: 117
    },
    "Migori": {
        url: "https://static.inaturalist.org/photos/256165984/medium.jpeg",
        name: "Falcate Acraea",
        scientific: "Telchinia perenna",
        kingdom: "fauna",
        observations: 5
    },
    "Mombasa": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/156903375/medium.jpg",
        name: "Kenyan Rock Agama",
        scientific: "Agama lionotus",
        kingdom: "fauna",
        observations: 142
    },
    "Murang'a": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/773832/medium.jpg",
        name: "Southern Black-Flycatcher",
        scientific: "Melaenornis pammelaina",
        kingdom: "fauna",
        observations: 8
    },
    "Nairobi": {
        url: "https://static.inaturalist.org/photos/73848759/medium.jpg",
        name: "Hadada Ibis",
        scientific: "Bostrychia hagedash",
        kingdom: "fauna",
        observations: 359
    },
    "Nakuru": {
        url: "https://static.inaturalist.org/photos/339871833/medium.jpg",
        name: "African Fish-Eagle",
        scientific: "Icthyophaga vocifer",
        kingdom: "fauna",
        observations: 755
    },
    "Nandi": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/33698/medium.jpg",
        name: "Bronze Sunbird",
        scientific: "Nectarinia kilimensis",
        kingdom: "fauna",
        observations: 7
    },
    "Narok": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
        name: "African Savanna Elephant",
        scientific: "Loxodonta africana",
        kingdom: "fauna",
        observations: 1280
    },
    "Nyamira": {
        url: "https://static.inaturalist.org/photos/8551992/medium.jpg",
        name: "Black-eyed Susan vine",
        scientific: "Thunbergia alata",
        kingdom: "flora",
        observations: 2
    },
    "Nyandarua": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/12832964/medium.jpg",
        name: "Helmeted Chameleon",
        scientific: "Trioceros hoehnelii",
        kingdom: "fauna",
        observations: 30
    },
    "Nyeri": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/59899521/medium.jpeg",
        name: "Southern Bushbuck",
        scientific: "Tragelaphus sylvaticus",
        kingdom: "fauna",
        observations: 193
    },
    "Samburu": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/455672585/medium.jpeg",
        name: "Reticulated Giraffe",
        scientific: "Giraffa reticulata",
        kingdom: "fauna",
        observations: 216
    },
    "Siaya": {
        url: "https://static.inaturalist.org/photos/2369526/medium.jpg",
        name: "Western Honey Bee",
        scientific: "Apis mellifera",
        kingdom: "fauna",
        observations: 15
    },
    "Taita Taveta": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
        name: "African Savanna Elephant",
        scientific: "Loxodonta africana",
        kingdom: "fauna",
        observations: 631
    },
    "Tana River": {
        url: "https://static.inaturalist.org/photos/163319541/medium.jpg",
        name: "Tana River Crested Mangabey",
        scientific: "Cercocebus galeritus",
        kingdom: "fauna",
        observations: 27
    },
    "Tharaka-Nithi": {
        url: "https://static.inaturalist.org/photos/113581623/medium.jpg",
        name: "Jackson's Chameleon",
        scientific: "Trioceros jacksonii",
        kingdom: "fauna",
        observations: 12
    },
    "Trans Nzoia": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/461182297/medium.jpg",
        name: "De Brazza's Monkey",
        scientific: "Cercopithecus neglectus",
        kingdom: "fauna",
        observations: 21
    },
    "Turkana": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/95521890/medium.jpeg",
        name: "Pallid Thicktail Scorpion",
        scientific: "Parabuthus pallidus",
        kingdom: "fauna",
        observations: 41
    },
    "Uasin Gishu": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/261339008/medium.jpg",
        name: "Gray Crowned-Crane",
        scientific: "Balearica regulorum",
        kingdom: "fauna",
        observations: 14
    },
    "Vihiga": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/779488/medium.jpg",
        name: "Baglafecht Weaver",
        scientific: "Ploceus baglafecht",
        kingdom: "fauna",
        observations: 15
    },
    "Wajir": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/262074134/medium.jpg",
        name: "Eastern Nomad Scorpion",
        scientific: "Hottentotta trilineatus",
        kingdom: "fauna",
        observations: 8
    },
    "West Pokot": {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/313784279/medium.jpeg",
        name: "African Redwood",
        scientific: "Hagenia abyssinica",
        kingdom: "flora",
        observations: 8
    },
};

// Fixed high-quality nature images used ONLY as a last-resort fallback
// (when a county has no iNaturalist data / photo at all).
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
 * Returns the image + caption for a given county name.
 * The image and caption always describe the SAME top species.
 * @param {string} countyName
 * @returns {{ url: string, caption: string, kingdom: string|null, scientific: string, isFallback: boolean }}
 */
export const getCountyImage = (countyName) => {
    if (!countyName) {
        return { url: stockImages[0], caption: '', kingdom: null, scientific: '', isFallback: true };
    }

    const hero = countyHeroMap[countyName];
    if (hero) {
        const label = hero.kingdom === 'flora' ? 'Flora' : 'Fauna';
        return {
            url: hero.url,
            caption: `${hero.name} (${label})`,
            kingdom: hero.kingdom,
            scientific: hero.scientific,
            isFallback: false
        };
    }

    // Last resort: deterministic stock image.
    let hash = 0;
    for (let i = 0; i < countyName.length; i++) {
        hash = countyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % stockImages.length;
    return { url: stockImages[index], caption: '', kingdom: null, scientific: '', isFallback: true };
};

export default countyHeroMap;
