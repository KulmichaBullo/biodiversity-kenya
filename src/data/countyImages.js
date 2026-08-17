// src/data/countyImages.js
//
// County -> top biodiversity imagery, curated from iNaturalist's real
// most-observed species per county (the same API the app uses for the
// County Details explorer), plus a few hand-picked representative
// landscape photos. Every county resolves to a real, on-theme image.
//
// getCountyImage(name) returns an object:
//   { url, caption, kingdom, isFallback }
//   - caption: e.g. "Hadada Ibis (Fauna)" or "Acacia (Flora)"
//   - kingdom: 'fauna' | 'flora' | 'landscape' | null
//   - isFallback: true only if no real species photo was available

// Representative landscape/scenery photos per county (curated, stable URLs).
// Used as the card hero; the species caption/correlation comes from iNaturalist below.
const countyLandscapeMap = {
    "Baringo": "https://inaturalist-open-data.s3.amazonaws.com/photos/89723844/medium.jpg",
    "Bomet": "https://inaturalist-open-data.s3.amazonaws.com/photos/735535/medium.jpg",
    "Bungoma": "https://inaturalist-open-data.s3.amazonaws.com/photos/187006756/medium.jpeg",
    "Busia": "https://inaturalist-open-data.s3.amazonaws.com/photos/10995644/medium.jpg",
    "Elgeyo-Marakwet": "https://inaturalist-open-data.s3.amazonaws.com/photos/779488/medium.jpg",
    "Embu": "https://static.inaturalist.org/photos/2369526/medium.jpg",
    "Garissa": "https://static.inaturalist.org/photos/252630897/medium.jpg",
    "Homa Bay": "https://static.inaturalist.org/photos/477005688/medium.jpeg",
    "Isiolo": "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
    "Kajiado": "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
    "Kakamega": "https://inaturalist-open-data.s3.amazonaws.com/photos/48842628/medium.jpeg",
    "Kericho": "https://inaturalist-open-data.s3.amazonaws.com/photos/47225717/medium.jpeg",
    "Kiambu": "https://inaturalist-open-data.s3.amazonaws.com/photos/12832964/medium.jpg",
    "Kilifi": "https://inaturalist-open-data.s3.amazonaws.com/photos/156903375/medium.jpg",
    "Kirinyaga": "https://inaturalist-open-data.s3.amazonaws.com/photos/779488/medium.jpg",
    "Kisii": "https://inaturalist-open-data.s3.amazonaws.com/photos/625159/medium.jpg",
    "Kisumu": "https://static.inaturalist.org/photos/477005688/medium.jpeg",
    "Kitui": "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
    "Kwale": "https://static.inaturalist.org/photos/107063651/medium.jpg",
    "Laikipia": "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
    "Lamu": "https://inaturalist-open-data.s3.amazonaws.com/photos/5856927/medium.jpg",
    "Machakos": "https://inaturalist-open-data.s3.amazonaws.com/photos/329009302/medium.jpg",
    "Makueni": "https://inaturalist-open-data.s3.amazonaws.com/photos/249827419/medium.jpeg",
    "Mandera": "https://inaturalist-open-data.s3.amazonaws.com/photos/95521890/medium.jpeg",
    "Marsabit": "https://inaturalist-open-data.s3.amazonaws.com/photos/260834331/medium.jpg",
    "Meru": "https://inaturalist-open-data.s3.amazonaws.com/photos/171937969/medium.jpeg",
    "Migori": "https://static.inaturalist.org/photos/256165984/medium.jpeg",
    "Mombasa": "https://inaturalist-open-data.s3.amazonaws.com/photos/156903375/medium.jpg",
    "Murang'a": "https://inaturalist-open-data.s3.amazonaws.com/photos/773832/medium.jpg",
    "Nairobi": "https://static.inaturalist.org/photos/73848759/medium.jpg",
    "Nakuru": "https://static.inaturalist.org/photos/339871833/medium.jpg",
    "Nandi": "https://inaturalist-open-data.s3.amazonaws.com/photos/33698/medium.jpg",
    "Narok": "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
    "Nyamira": "https://static.inaturalist.org/photos/8551992/medium.jpg",
    "Nyandarua": "https://inaturalist-open-data.s3.amazonaws.com/photos/12832964/medium.jpg",
    "Nyeri": "https://inaturalist-open-data.s3.amazonaws.com/photos/59899521/medium.jpeg",
    "Samburu": "https://inaturalist-open-data.s3.amazonaws.com/photos/455672585/medium.jpeg",
    "Siaya": "https://static.inaturalist.org/photos/2369526/medium.jpg",
    "Taita Taveta": "https://inaturalist-open-data.s3.amazonaws.com/photos/93674728/medium.jpg",
    "Tana River": "https://static.inaturalist.org/photos/163319541/medium.jpg",
    "Tharaka-Nithi": "https://static.inaturalist.org/photos/113581623/medium.jpg",
    "Trans Nzoia": "https://inaturalist-open-data.s3.amazonaws.com/photos/461182297/medium.jpg",
    "Turkana": "https://inaturalist-open-data.s3.amazonaws.com/photos/95521890/medium.jpeg",
    "Uasin Gishu": "https://inaturalist-open-data.s3.amazonaws.com/photos/261339008/medium.jpg",
    "Vihiga": "https://inaturalist-open-data.s3.amazonaws.com/photos/779488/medium.jpg",
    "Wajir": "https://inaturalist-open-data.s3.amazonaws.com/photos/262074134/medium.jpg",
    "West Pokot": "https://inaturalist-open-data.s3.amazonaws.com/photos/313784279/medium.jpeg",
};

// Top observed species per county from iNaturalist (fauna + flora).
// Used to caption each card with the county's signature species.
const countySpeciesMap = {
    "Baringo": [{name: "Lesser Flamingo", kingdom: "fauna", scientific: "Phoeniconaias minor"}, {name: "Nile Crocodile", kingdom: "fauna", scientific: "Crocodylus niloticus"}, {name: "White-browed Sparrow-Weaver", kingdom: "fauna", scientific: "Plocepasser mahali"}, {name: "Jackson's Hornbill", kingdom: "fauna", scientific: "Tockus jacksoni"}, {name: "African Fish-Eagle", kingdom: "fauna", scientific: "Icthyophaga vocifer"}, {name: "Beautiful Sunbird", kingdom: "fauna", scientific: "Cinnyris pulchellus"}],
    "Bomet": [{name: "Little Pansy", kingdom: "fauna", scientific: "Junonia sophia"}, {name: "Helmeted Chameleon", kingdom: "fauna", scientific: "Trioceros hoehnelii"}, {name: "Jackson's Forest Lizard", kingdom: "fauna", scientific: "Adolfus jacksoni"}, {name: "African Migrant", kingdom: "fauna", scientific: "Catopsilia florella"}, {name: "Wattled Lapwing", kingdom: "fauna", scientific: "Vanellus senegallus"}, {name: "Slate-colored Boubou", kingdom: "fauna", scientific: "Laniarius funebris"}],
    "Bungoma": [{name: "Common Reed Frog", kingdom: "fauna", scientific: "Hyperolius viridiflavus"}, {name: "Helmeted Chameleon", kingdom: "fauna", scientific: "Trioceros hoehnelii"}, {name: "Natal Puddle Frog", kingdom: "fauna", scientific: "Phrynobatrachus natalensis"}, {name: "Anchieta's Ridged Frog", kingdom: "fauna", scientific: "Ptychadena anchietae"}, {name: "Crowned bullfrog", kingdom: "fauna", scientific: "Hoplobatrachus occipitalis"}, {name: "Nile Monitor", kingdom: "fauna", scientific: "Varanus niloticus"}],
    "Busia": [{name: "Lucia Widow", kingdom: "fauna", scientific: "Palpopleura lucia"}, {name: "Red Basker", kingdom: "fauna", scientific: "Urothemis assignata"}, {name: "Gray-headed Kingfisher", kingdom: "fauna", scientific: "Halcyon leucocephala"}, {name: "Speckled Mousebird", kingdom: "fauna", scientific: "Colius striatus"}, {name: "African Jacana", kingdom: "fauna", scientific: "Actophilornis africanus"}, {name: "African Pied Wagtail", kingdom: "fauna", scientific: "Motacilla aguimp"}],
    "Elgeyo-Marakwet": [{name: "Baglafecht Weaver", kingdom: "fauna", scientific: "Ploceus baglafecht"}, {name: "Common Bulbul", kingdom: "fauna", scientific: "Pycnonotus barbatus"}, {name: "Bronze Sunbird", kingdom: "fauna", scientific: "Nectarinia kilimensis"}, {name: "Northern Fiscal", kingdom: "fauna", scientific: "Lanius humeralis"}, {name: "African Pied Wagtail", kingdom: "fauna", scientific: "Motacilla aguimp"}, {name: "Rüppell's Starling", kingdom: "fauna", scientific: "Lamprotornis purpuroptera"}],
    "Embu": [{name: "Western Honey Bee", kingdom: "fauna", scientific: "Apis mellifera"}, {name: "Camponotus chrysurus", kingdom: "fauna", scientific: "Camponotus chrysurus"}, {name: "Red-clover Blue", kingdom: "fauna", scientific: "Actizera stellata"}, {name: "Lepisiota canescens", kingdom: "fauna", scientific: "Lepisiota canescens"}, {name: "Peters' Reed Frog", kingdom: "fauna", scientific: "Hyperolius glandicolor"}, {name: "Hyperaspis pantherina", kingdom: "fauna", scientific: "Hyperaspis pantherina"}],
    "Garissa": [{name: "Yellow Baboon", kingdom: "fauna", scientific: "Papio cynocephalus"}, {name: "Kirk's Dik-dik", kingdom: "fauna", scientific: "Madoqua kirkii"}, {name: "Hirola", kingdom: "fauna", scientific: "Beatragus hunteri"}, {name: "Reticulated Giraffe", kingdom: "fauna", scientific: "Giraffa reticulata"}, {name: "Somali Dwarf Mongoose", kingdom: "fauna", scientific: "Helogale hirtula"}, {name: "Tana River Red Colobus", kingdom: "fauna", scientific: "Piliocolobus rufomitratus"}],
    "Homa Bay": [{name: "Hamerkop", kingdom: "fauna", scientific: "Scopus umbretta"}, {name: "Little Egret", kingdom: "fauna", scientific: "Egretta garzetta"}, {name: "African Fish-Eagle", kingdom: "fauna", scientific: "Icthyophaga vocifer"}, {name: "Tropical House Gecko", kingdom: "fauna", scientific: "Hemidactylus mabouia"}, {name: "Pied Kingfisher", kingdom: "fauna", scientific: "Ceryle rudis"}, {name: "Nile Monitor", kingdom: "fauna", scientific: "Varanus niloticus"}],
    "Isiolo": [{name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Reticulated Giraffe", kingdom: "fauna", scientific: "Giraffa reticulata"}, {name: "Grévy's Zebra", kingdom: "fauna", scientific: "Equus grevyi"}, {name: "Kirk's Dik-dik", kingdom: "fauna", scientific: "Madoqua kirkii"}, {name: "Northern Red-billed Hornbill", kingdom: "fauna", scientific: "Tockus erythrorhynchus"}, {name: "Olive Baboon", kingdom: "fauna", scientific: "Papio anubis"}],
    "Kajiado": [{name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Superb Starling", kingdom: "fauna", scientific: "Lamprotornis superbus"}, {name: "Gray Crowned-Crane", kingdom: "fauna", scientific: "Balearica regulorum"}, {name: "Spotted Hyena", kingdom: "fauna", scientific: "Crocuta crocuta"}, {name: "Common Hippopotamus", kingdom: "fauna", scientific: "Hippopotamus amphibius"}, {name: "Yellow Baboon", kingdom: "fauna", scientific: "Papio cynocephalus"}],
    "Kakamega": [{name: "Gregori’s Brown Pansy", kingdom: "fauna", scientific: "Junonia gregorii"}, {name: "Black-and-white-casqued Hornbill", kingdom: "fauna", scientific: "Bycanistes subcylindricus"}, {name: "Common Pathfinder", kingdom: "fauna", scientific: "Evena crithea"}, {name: "Grey-throated Barbet", kingdom: "fauna", scientific: "Gymnobucco bonapartei"}, {name: "Apple-green Swallowtail", kingdom: "fauna", scientific: "Papilio phorcas"}, {name: "Bronze Sunbird", kingdom: "fauna", scientific: "Nectarinia kilimensis"}],
    "Kericho": [{name: "Vervet Monkey", kingdom: "fauna", scientific: "Chlorocebus pygerythrus"}, {name: "Common Bulbul", kingdom: "fauna", scientific: "Pycnonotus barbatus"}, {name: "Common Reed Frog", kingdom: "fauna", scientific: "Hyperolius viridiflavus"}, {name: "Gray Crowned-Crane", kingdom: "fauna", scientific: "Balearica regulorum"}, {name: "Speckled Mousebird", kingdom: "fauna", scientific: "Colius striatus"}, {name: "Black Kite", kingdom: "fauna", scientific: "Milvus migrans"}],
    "Kiambu": [{name: "Helmeted Chameleon", kingdom: "fauna", scientific: "Trioceros hoehnelii"}, {name: "Baglafecht Weaver", kingdom: "fauna", scientific: "Ploceus baglafecht"}, {name: "Olive Baboon", kingdom: "fauna", scientific: "Papio anubis"}, {name: "Common Bulbul", kingdom: "fauna", scientific: "Pycnonotus barbatus"}, {name: "Streaky Seedeater", kingdom: "fauna", scientific: "Crithagra striolata"}, {name: "Cinnamon-chested Bee-eater", kingdom: "fauna", scientific: "Merops oreobates"}],
    "Kilifi": [{name: "Kenyan Rock Agama", kingdom: "fauna", scientific: "Agama lionotus"}, {name: "White-headed Dwarf Gecko", kingdom: "fauna", scientific: "Lygodactylus mombasicus"}, {name: "Amerila vitrea", kingdom: "fauna", scientific: "Amerila vitrea"}, {name: "East African Fiddler Crab", kingdom: "fauna", scientific: "Austruca occidentalis"}, {name: "Rough-scaled Plated Lizard", kingdom: "fauna", scientific: "Broadleysaurus major"}, {name: "House Crow", kingdom: "fauna", scientific: "Corvus splendens"}],
    "Kirinyaga": [{name: "Baglafecht Weaver", kingdom: "fauna", scientific: "Ploceus baglafecht"}, {name: "White-eyed Slaty-Flycatcher", kingdom: "fauna", scientific: "Melaenornis fischeri"}, {name: "Hunter's Cisticola", kingdom: "fauna", scientific: "Cisticola hunteri"}, {name: "Streaky Seedeater", kingdom: "fauna", scientific: "Crithagra striolata"}, {name: "African Dusky Flycatcher", kingdom: "fauna", scientific: "Muscicapa adusta"}, {name: "Hartlaub's Turaco", kingdom: "fauna", scientific: "Tauraco hartlaubi"}],
    "Kisii": [{name: "Red-billed Firefinch", kingdom: "fauna", scientific: "Lagonosticta senegala"}, {name: "Straw-coloured Fruit Bat", kingdom: "fauna", scientific: "Eidolon helvum"}, {name: "Oriental Latrine Fly", kingdom: "fauna", scientific: "Chrysomya megacephala"}, {name: "African Paradise-Flycatcher", kingdom: "fauna", scientific: "Terpsiphone viridis"}, {name: "White-browed Robin-Chat", kingdom: "fauna", scientific: "Cossypha heuglini"}, {name: "Bronze Sunbird", kingdom: "fauna", scientific: "Nectarinia kilimensis"}],
    "Kisumu": [{name: "Hamerkop", kingdom: "fauna", scientific: "Scopus umbretta"}, {name: "Village Weaver", kingdom: "fauna", scientific: "Ploceus cucullatus"}, {name: "Little Egret", kingdom: "fauna", scientific: "Egretta garzetta"}, {name: "African Sacred Ibis", kingdom: "fauna", scientific: "Threskiornis aethiopicus"}, {name: "Swamp Flycatcher", kingdom: "fauna", scientific: "Muscicapa aquatica"}, {name: "Water Thick-knee", kingdom: "fauna", scientific: "Burhinus vermiculatus"}],
    "Kitui": [{name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Kenyan Rock Agama", kingdom: "fauna", scientific: "Agama lionotus"}, {name: "Northern Red-billed Hornbill", kingdom: "fauna", scientific: "Tockus erythrorhynchus"}, {name: "Yellow Baboon", kingdom: "fauna", scientific: "Papio cynocephalus"}, {name: "Hinde's Dik-Dik", kingdom: "fauna", scientific: "Madoqua hindei"}, {name: "Eastern Chanting-Goshawk", kingdom: "fauna", scientific: "Melierax poliopterus"}],
    "Kwale": [{name: "Flap-necked Chameleon", kingdom: "fauna", scientific: "Chamaeleo dilepis"}, {name: "Spiny Seahorse", kingdom: "fauna", scientific: "Hippocampus histrix"}, {name: "Pygmy Grass Chameleon", kingdom: "fauna", scientific: "Rieppeleon kerstenii"}, {name: "Suni", kingdom: "fauna", scientific: "Nesotragus moschatus"}, {name: "Four-toed Sengi", kingdom: "fauna", scientific: "Petrodromus tetradactylus"}, {name: "Harvey's Duiker", kingdom: "fauna", scientific: "Cephalophorus harveyi"}],
    "Laikipia": [{name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Reticulated Giraffe", kingdom: "fauna", scientific: "Giraffa reticulata"}, {name: "Grévy's Zebra", kingdom: "fauna", scientific: "Equus grevyi"}, {name: "Superb Starling", kingdom: "fauna", scientific: "Lamprotornis superbus"}, {name: "Olive Baboon", kingdom: "fauna", scientific: "Papio anubis"}, {name: "Spotted Hyena", kingdom: "fauna", scientific: "Crocuta crocuta"}],
    "Lamu": [{name: "White-headed Dwarf Gecko", kingdom: "fauna", scientific: "Lygodactylus mombasicus"}, {name: "Gregory's Blue-headed Agama", kingdom: "fauna", scientific: "Acanthocercus gregorii"}, {name: "Northern Carmine Bee-eater", kingdom: "fauna", scientific: "Merops nubicus"}, {name: "Straw-coloured Fruit Bat", kingdom: "fauna", scientific: "Eidolon helvum"}, {name: "Flathead Leaf-toed Gecko", kingdom: "fauna", scientific: "Hemidactylus platycephalus"}, {name: "Marabou Stork", kingdom: "fauna", scientific: "Leptoptilos crumenifer"}],
    "Machakos": [{name: "Superb Starling", kingdom: "fauna", scientific: "Lamprotornis superbus"}, {name: "White-browed Sparrow-Weaver", kingdom: "fauna", scientific: "Plocepasser mahali"}, {name: "Common Ostrich", kingdom: "fauna", scientific: "Struthio camelus"}, {name: "Helmeted Guineafowl", kingdom: "fauna", scientific: "Numida meleagris"}, {name: "Plains Zebra", kingdom: "fauna", scientific: "Equus quagga"}, {name: "White-backed Vulture", kingdom: "fauna", scientific: "Gyps africanus"}],
    "Makueni": [{name: "Domestic Dog", kingdom: "fauna", scientific: "Canis familiaris"}, {name: "Kenyan Rock Agama", kingdom: "fauna", scientific: "Agama lionotus"}, {name: "Spotted Hyena", kingdom: "fauna", scientific: "Crocuta crocuta"}, {name: "Superb Starling", kingdom: "fauna", scientific: "Lamprotornis superbus"}, {name: "Yellow Baboon", kingdom: "fauna", scientific: "Papio cynocephalus"}, {name: "Vervet Monkey", kingdom: "fauna", scientific: "Chlorocebus pygerythrus"}],
    "Mandera": [{name: "Pallid Thicktail Scorpion", kingdom: "fauna", scientific: "Parabuthus pallidus"}, {name: "Eastern Nomad Scorpion", kingdom: "fauna", scientific: "Hottentotta trilineatus"}, {name: "Pygmy Falcon", kingdom: "fauna", scientific: "Polihierax semitorquatus"}, {name: "Hamadryas Baboon", kingdom: "fauna", scientific: "Papio hamadryas"}, {name: "Kenyan Rock Agama", kingdom: "fauna", scientific: "Agama lionotus"}, {name: "Abdim's Stork", kingdom: "fauna", scientific: "Ciconia abdimii"}],
    "Marsabit": [{name: "Heuglin's Bustard", kingdom: "fauna", scientific: "Neotis heuglinii"}, {name: "Pallid Thicktail Scorpion", kingdom: "fauna", scientific: "Parabuthus pallidus"}, {name: "Spur-winged Lapwing", kingdom: "fauna", scientific: "Vanellus spinosus"}, {name: "Chestnut-headed Sparrow-Lark", kingdom: "fauna", scientific: "Eremopterix signatus"}, {name: "Somali Crow", kingdom: "fauna", scientific: "Corvus edithae"}, {name: "Chestnut-bellied Sandgrouse", kingdom: "fauna", scientific: "Pterocles exustus"}],
    "Meru": [{name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Reticulated Giraffe", kingdom: "fauna", scientific: "Giraffa reticulata"}, {name: "Olive Baboon", kingdom: "fauna", scientific: "Papio anubis"}, {name: "Grévy's Zebra", kingdom: "fauna", scientific: "Equus grevyi"}, {name: "Somali Ostrich", kingdom: "fauna", scientific: "Struthio molybdophanes"}, {name: "Kenyan Rock Agama", kingdom: "fauna", scientific: "Agama lionotus"}],
    "Migori": [{name: "Falcate Acraea", kingdom: "fauna", scientific: "Telchinia perenna"}, {name: "Kivu Reed Frog", kingdom: "fauna", scientific: "Hyperolius kivuensis"}, {name: "Bandit Shieldbug", kingdom: "fauna", scientific: "Cryptacrus comes"}, {name: "African Harrier-Hawk", kingdom: "fauna", scientific: "Polyboroides typus"}, {name: "Citrus Swallowtail", kingdom: "fauna", scientific: "Papilio demodocus"}, {name: "Little Pansy", kingdom: "fauna", scientific: "Junonia sophia"}],
    "Mombasa": [{name: "Kenyan Rock Agama", kingdom: "fauna", scientific: "Agama lionotus"}, {name: "House Crow", kingdom: "fauna", scientific: "Corvus splendens"}, {name: "Vervet Monkey", kingdom: "fauna", scientific: "Chlorocebus pygerythrus"}, {name: "House Sparrow", kingdom: "fauna", scientific: "Passer domesticus"}, {name: "Straw-coloured Fruit Bat", kingdom: "fauna", scientific: "Eidolon helvum"}, {name: "White-headed Dwarf Gecko", kingdom: "fauna", scientific: "Lygodactylus mombasicus"}],
    "Murang'a": [{name: "Southern Black-Flycatcher", kingdom: "fauna", scientific: "Melaenornis pammelaina"}, {name: "Channeled Apple Snail", kingdom: "fauna", scientific: "Pomacea canaliculata"}, {name: "Fork-tailed Drongo", kingdom: "fauna", scientific: "Dicrurus adsimilis"}, {name: "Black-backed Puffback", kingdom: "fauna", scientific: "Dryoscopus cubla"}, {name: "White-browed Sparrow-Weaver", kingdom: "fauna", scientific: "Plocepasser mahali"}, {name: "Abyssinian Thrush", kingdom: "fauna", scientific: "Turdus abyssinicus"}],
    "Nairobi": [{name: "Hadada Ibis", kingdom: "fauna", scientific: "Bostrychia hagedash"}, {name: "Marabou Stork", kingdom: "fauna", scientific: "Leptoptilos crumenifer"}, {name: "Black Kite", kingdom: "fauna", scientific: "Milvus migrans"}, {name: "Variable Sunbird", kingdom: "fauna", scientific: "Cinnyris venustus"}, {name: "Abyssinian Thrush", kingdom: "fauna", scientific: "Turdus abyssinicus"}, {name: "Baglafecht Weaver", kingdom: "fauna", scientific: "Ploceus baglafecht"}],
    "Nakuru": [{name: "African Fish-Eagle", kingdom: "fauna", scientific: "Icthyophaga vocifer"}, {name: "Great White Pelican", kingdom: "fauna", scientific: "Pelecanus onocrotalus"}, {name: "Olive Baboon", kingdom: "fauna", scientific: "Papio anubis"}, {name: "Superb Starling", kingdom: "fauna", scientific: "Lamprotornis superbus"}, {name: "Common Hippopotamus", kingdom: "fauna", scientific: "Hippopotamus amphibius"}, {name: "Yellow-billed Stork", kingdom: "fauna", scientific: "Mycteria ibis"}],
    "Nandi": [{name: "Bronze Sunbird", kingdom: "fauna", scientific: "Nectarinia kilimensis"}, {name: "African Pied Wagtail", kingdom: "fauna", scientific: "Motacilla aguimp"}, {name: "African Striped Skink", kingdom: "fauna", scientific: "Trachylepis striata"}, {name: "Cinnamon-chested Bee-eater", kingdom: "fauna", scientific: "Merops oreobates"}, {name: "Hadada Ibis", kingdom: "fauna", scientific: "Bostrychia hagedash"}, {name: "Common Bulbul", kingdom: "fauna", scientific: "Pycnonotus barbatus"}],
    "Narok": [{name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Spotted Hyena", kingdom: "fauna", scientific: "Crocuta crocuta"}, {name: "Common Hippopotamus", kingdom: "fauna", scientific: "Hippopotamus amphibius"}, {name: "Nile Crocodile", kingdom: "fauna", scientific: "Crocodylus niloticus"}, {name: "White-backed Vulture", kingdom: "fauna", scientific: "Gyps africanus"}, {name: "Lilac-breasted Roller", kingdom: "fauna", scientific: "Coracias caudatus"}],
    "Nyamira": [{name: "Black-headed Heron", kingdom: "fauna", scientific: "Ardea melanocephala"}, {name: "Martial Eagle", kingdom: "fauna", scientific: "Polemaetus bellicosus"}, {name: "Common Bulbul", kingdom: "fauna", scientific: "Pycnonotus barbatus"}, {name: "Mwanza Flat-headed Rock Agama", kingdom: "fauna", scientific: "Agama mwanzae"}, {name: "Bathroom Moth Fly", kingdom: "fauna", scientific: "Clogmia albipunctata"}, {name: "Brown‐spotted Locust", kingdom: "fauna", scientific: "Cyrtacanthacris tatarica"}],
    "Nyandarua": [{name: "Helmeted Chameleon", kingdom: "fauna", scientific: "Trioceros hoehnelii"}, {name: "Sharpe's Longclaw", kingdom: "fauna", scientific: "Macronyx sharpei"}, {name: "Long-tailed Widowbird", kingdom: "fauna", scientific: "Euplectes progne"}, {name: "Streaky Seedeater", kingdom: "fauna", scientific: "Crithagra striolata"}, {name: "African Stonechat", kingdom: "fauna", scientific: "Saxicola torquatus"}, {name: "Baglafecht Weaver", kingdom: "fauna", scientific: "Ploceus baglafecht"}],
    "Nyeri": [{name: "Southern Bushbuck", kingdom: "fauna", scientific: "Tragelaphus sylvaticus"}, {name: "Baglafecht Weaver", kingdom: "fauna", scientific: "Ploceus baglafecht"}, {name: "Giant Forest Hog", kingdom: "fauna", scientific: "Hylochoerus meinertzhageni"}, {name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Speckled Mousebird", kingdom: "fauna", scientific: "Colius striatus"}, {name: "Streaky Seedeater", kingdom: "fauna", scientific: "Crithagra striolata"}],
    "Samburu": [{name: "Reticulated Giraffe", kingdom: "fauna", scientific: "Giraffa reticulata"}, {name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Spotted Hyena", kingdom: "fauna", scientific: "Crocuta crocuta"}, {name: "Grévy's Zebra", kingdom: "fauna", scientific: "Equus grevyi"}, {name: "Kirk's Dik-dik", kingdom: "fauna", scientific: "Madoqua kirkii"}, {name: "Vulturine Guineafowl", kingdom: "fauna", scientific: "Acryllium vulturinum"}],
    "Siaya": [{name: "Western Honey Bee", kingdom: "fauna", scientific: "Apis mellifera"}, {name: "Little Pansy", kingdom: "fauna", scientific: "Junonia sophia"}, {name: "Village Weaver", kingdom: "fauna", scientific: "Ploceus cucullatus"}, {name: "Red-eyed Dove", kingdom: "fauna", scientific: "Streptopelia semitorquata"}, {name: "Little Egret", kingdom: "fauna", scientific: "Egretta garzetta"}, {name: "Portia Widow", kingdom: "fauna", scientific: "Palpopleura portia"}],
    "Taita Taveta": [{name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Kenyan Rock Agama", kingdom: "fauna", scientific: "Agama lionotus"}, {name: "Hinde's Dik-Dik", kingdom: "fauna", scientific: "Madoqua hindei"}, {name: "Northern Red-billed Hornbill", kingdom: "fauna", scientific: "Tockus erythrorhynchus"}, {name: "Superb Starling", kingdom: "fauna", scientific: "Lamprotornis superbus"}, {name: "Eastern Chanting-Goshawk", kingdom: "fauna", scientific: "Melierax poliopterus"}],
    "Tana River": [{name: "Tana River Crested Mangabey", kingdom: "fauna", scientific: "Cercocebus galeritus"}, {name: "Tana River Red Colobus", kingdom: "fauna", scientific: "Piliocolobus rufomitratus"}, {name: "Common Hippopotamus", kingdom: "fauna", scientific: "Hippopotamus amphibius"}, {name: "Reticulated Giraffe", kingdom: "fauna", scientific: "Giraffa reticulata"}, {name: "Yellow Baboon", kingdom: "fauna", scientific: "Papio cynocephalus"}, {name: "Vulturine Guineafowl", kingdom: "fauna", scientific: "Acryllium vulturinum"}],
    "Tharaka-Nithi": [{name: "Jackson's Chameleon", kingdom: "fauna", scientific: "Trioceros jacksonii"}, {name: "Mount Kenya Side-striped Chameleon", kingdom: "fauna", scientific: "Trioceros schubotzi"}, {name: "Flap-necked Chameleon", kingdom: "fauna", scientific: "Chamaeleo dilepis"}, {name: "Mount Kenya Hornless Chameleon", kingdom: "fauna", scientific: "Kinyongia excubitor"}, {name: "African Savanna Elephant", kingdom: "fauna", scientific: "Loxodonta africana"}, {name: "Ashe's Bush Viper", kingdom: "fauna", scientific: "Atheris desaixi"}],
    "Trans Nzoia": [{name: "De Brazza's Monkey", kingdom: "fauna", scientific: "Cercopithecus neglectus"}, {name: "Southern Bushbuck", kingdom: "fauna", scientific: "Tragelaphus sylvaticus"}, {name: "African Dusky Flycatcher", kingdom: "fauna", scientific: "Muscicapa adusta"}, {name: "Mantled Guereza", kingdom: "fauna", scientific: "Colobus guereza"}, {name: "Gray Crowned-Crane", kingdom: "fauna", scientific: "Balearica regulorum"}, {name: "Cinnamon-chested Bee-eater", kingdom: "fauna", scientific: "Merops oreobates"}],
    "Turkana": [{name: "Pallid Thicktail Scorpion", kingdom: "fauna", scientific: "Parabuthus pallidus"}, {name: "Eastern Nomad Scorpion", kingdom: "fauna", scientific: "Hottentotta trilineatus"}, {name: "Abyssinian Roller", kingdom: "fauna", scientific: "Coracias abyssinicus"}, {name: "Eastern Violet-backed Sunbird", kingdom: "fauna", scientific: "Anthreptes orientalis"}, {name: "Superb Starling", kingdom: "fauna", scientific: "Lamprotornis superbus"}, {name: "Red-and-yellow Barbet", kingdom: "fauna", scientific: "Trachyphonus erythrocephalus"}],
    "Uasin Gishu": [{name: "Gray Crowned-Crane", kingdom: "fauna", scientific: "Balearica regulorum"}, {name: "Common Reed Frog", kingdom: "fauna", scientific: "Hyperolius viridiflavus"}, {name: "Baglafecht Weaver", kingdom: "fauna", scientific: "Ploceus baglafecht"}, {name: "Red-cheeked Cordonbleu", kingdom: "fauna", scientific: "Uraeginthus bengalus"}, {name: "Common Bulbul", kingdom: "fauna", scientific: "Pycnonotus barbatus"}, {name: "Northern Fiscal", kingdom: "fauna", scientific: "Lanius humeralis"}],
    "Vihiga": [{name: "Baglafecht Weaver", kingdom: "fauna", scientific: "Ploceus baglafecht"}, {name: "Western Honey Bee", kingdom: "fauna", scientific: "Apis mellifera"}, {name: "Gregori’s Brown Pansy", kingdom: "fauna", scientific: "Junonia gregorii"}, {name: "Bronze Sunbird", kingdom: "fauna", scientific: "Nectarinia kilimensis"}, {name: "Northern Grey-headed Sparrow", kingdom: "fauna", scientific: "Passer griseus"}, {name: "African Pied Wagtail", kingdom: "fauna", scientific: "Motacilla aguimp"}],
    "Wajir": [{name: "Eastern Nomad Scorpion", kingdom: "fauna", scientific: "Hottentotta trilineatus"}, {name: "African Gray Flycatcher", kingdom: "fauna", scientific: "Bradornis microrhynchus"}, {name: "Magpie Starling", kingdom: "fauna", scientific: "Speculipastor bicolor"}, {name: "African Migrant", kingdom: "fauna", scientific: "Catopsilia florella"}, {name: "Chestnut-bellied Sandgrouse", kingdom: "fauna", scientific: "Pterocles exustus"}, {name: "Pycnodactylopsis mitis", kingdom: "fauna", scientific: "Pycnodactylopsis mitis"}],
    "West Pokot": [{name: "White-crested Turaco", kingdom: "fauna", scientific: "Tauraco leucolophus"}, {name: "Rüppell's Starling", kingdom: "fauna", scientific: "Lamprotornis purpuroptera"}, {name: "D'Arnaud's Barbet", kingdom: "fauna", scientific: "Trachyphonus darnaudii"}, {name: "Pokot Chameleon", kingdom: "fauna", scientific: "Trioceros nyirit"}, {name: "Lilac-breasted Roller", kingdom: "fauna", scientific: "Coracias caudatus"}, {name: "Jackson's Hornbill", kingdom: "fauna", scientific: "Tockus jacksoni"}],
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
 * @param {string} countyName
 * @returns {{ url: string, caption: string, kingdom: string|null, isFallback: boolean }}
 */
export const getCountyImage = (countyName) => {
    if (!countyName) {
        return { url: stockImages[0], caption: '', kingdom: null, isFallback: true };
    }

    const landscape = countyLandscapeMap[countyName];
    const speciesList = countySpeciesMap[countyName];

    // Pick a signature species to caption with (prefer the top observed).
    if (landscape && speciesList && speciesList.length > 0) {
        const top = speciesList[0];
        const cap = `${top.name}${top.kingdom ? ' (' + (top.kingdom === 'fauna' ? 'Fauna' : 'Flora') + ')' : ''}`;
        return { url: landscape, caption: cap, kingdom: top.kingdom, isFallback: false };
    }

    // Landscape exists but no species -> still show the landscape, no caption.
    if (landscape) {
        return { url: landscape, caption: '', kingdom: 'landscape', isFallback: false };
    }

    // Last resort: deterministic stock image.
    let hash = 0;
    for (let i = 0; i < countyName.length; i++) {
        hash = countyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % stockImages.length;
    return { url: stockImages[index], caption: '', kingdom: null, isFallback: true };
};

export default countyLandscapeMap;
