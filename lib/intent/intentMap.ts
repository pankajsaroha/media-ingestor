export type Intent =
    | "religious"
    | "spiritual"
    | "nature-hills"
    | "nature-water"
    | "heritage"
    | "monument"
    | "urban-place"
    | "adventure"
    | "general";

export const INTENT_KEYWORDS: Record<Intent, string[]> = {
    religious: [
        "mandir", "temple", "devi", "mata", "bhagwan",
        "shiv", "shiva", "mahadev", "ram", "krishna",
        "hanuman", "baba", "dargah", "masjid",
        "church", "gurudwara", "jyotirling", "shakti"
    ],

    spiritual: ["ashram", "math", "peeth", "kutir", "akhara"],

    "nature-hills": ["hill", "parvat", "pahad", "trek", "peak", "mount"],

    "nature-water": [
        "river", "nadi", "ganga", "yamuna",
        "kund", "talab", "jheel", "lake", "ghat"
    ],

    heritage: ["fort", "qila", "palace", "mahal", "heritage"],

    monument: ["statue", "memorial", "stupa"],

    "urban-place": ["chowk", "bazaar", "market", "road"],

    adventure: ["trek", "hiking", "camping"],

    general: [],
};