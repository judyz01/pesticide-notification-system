const county_lookup_table = {
    "ALAMEDA": 1,
    "ALPINE": 2,
    "AMADOR": 3,
    "BUTTE": 4,
    "CALAVERAS": 5,
    "COLUSA": 6,
    "CONTRA COSTA": 7,
    "DELNORTE": 8,
    "ELDORADO": 9,
    "FRESNO": 10,
    "GLENN": 11,
    "HUMBOLDT": 12,
    "IMPERIAL": 13,
    "INYO": 14,
    "KERN": 15,
    "KINGS": 16,
    "LAKE": 17,
    "LASSEN": 18,
    "LOSANGELES": 19,
    "MADERA": 20,
    "MARIN": 21,
    "MARIPOSA": 22,
    "MENDOCINO": 23,
    "MERCED": 24,
    "MODOC": 25,
    "MONO": 26,
    "MONTEREY": 27,
    "NAPA": 28,
    "NEVADA": 29,
    "ORANGE": 30,
    "PLACER": 31,
    "PLUMAS": 32,
    "RIVERSIDE": 33,
    "SACRAMENTO": 34,
    "SANBENITO": 35,
    "SANBERNARDINO": 36,
    "SANDIEGO": 37,
    "SANFRANCISCO": 38,
    "SANJOAQUIN": 39,
    "SANLUIS OBISPO": 40,
    "SANMATEO": 41,
    "SANTABARBARA": 42,
    "SANTACLARA": 43,
    "SANTACRUZ": 44,
    "SHASTA": 45,
    "SIERRA": 46,
    "SISKIYOU": 47,
    "SOLANO": 48,
    "SONOMA": 49,
    "STANISLAUS": 50,
    "SUTTER": 51,
    "TEHAMA": 52,
    "TRINITY": 53,
    "TULARE": 54,
    "TUOLUMNE": 55,
    "VENTURA": 56,
    "YOLO": 57,
    "YUBA": 58    
};
const available_county_table = [
    "STANISLAUS",
    // "SACRAMENTO"
];

/**
 * 
 * @param {*} countyName in all caps
 * @returns the county number of a specific county in California if it exists, or 0 otherwise.
 */
const county_lookup = (countyName) => {
    const county_num = county_lookup_table[countyName];
    if (county_num) {
        return county_num;
    } else {
        return 0;
    }
}

module.exports = {
    county_lookup,
    available_county_table
}