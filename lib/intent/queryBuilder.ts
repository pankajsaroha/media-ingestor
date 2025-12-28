import { Intent } from "./intentMap";

export function buildQueries(place: string, city: string, intent: Intent) {
    switch(intent) {
        case "religious":
            return [
                `${place} ${city}`,
                `${place} ${city} mandir`,
                `${place} ${city} temple`,
                `${place} ${city} devi`,
                `${place} ${city} mata`,
                `${place} ${city} bhagwan`,
                `${place} ${city} shiv`,
                `${place} ${city} shiva`,
                `${place} ${city} mahadev`,
                `${place} ${city} ram`,
                `${place} ${city} krishna`,
                `${place} ${city} hanuman`,
                `${place} ${city} baba`,
                `${place} ${city} gurudwara`,
                `${place} ${city} jyotirling`,
                `${place} ${city} shakti`,
            ];
        case "spiritual":
            return [
                `${place} ${city}`,
                `${place} ${city} ashram`,
                `${place} ${city} peeth`,
                `${place} ${city} kutir`,
                `${place} ${city} akhara`,
            ];

        case "nature-hills":
            return [
                `${place} ${city}`,
                `${place} ${city} hill`,
                `${place} ${city} parvat`,
                `${place} ${city} pahad`,
                `${place} ${city} trek`,
                `${place} ${city} trekking`,
                `${place} ${city} peak`,
                `${place} ${city} mount`,
            ];

        case "nature-water": 
            return [
                `${place} ${city}`,
                `${place} ${city} river`,
                `${place} ${city} nadi`,
                `${place} ${city} ganga`,
                `${place} ${city} yamuna`,
                `${place} ${city} kund`,
                `${place} ${city} talab`,
                `${place} ${city} jheel`,
                `${place} ${city} lake`,
                `${place} ${city} ghat`,
            ];

        case "heritage":
            return [
                `${place} ${city}`,
                `${place} ${city} fort`,
                `${place} ${city} qila`,
                `${place} ${city} kila`,
                `${place} ${city} palace`,
                `${place} ${city} mahal`,
                `${place} ${city} heritage`,
            ];

        case "monument":
            return [
                `${place} ${city}`,
                `${place} ${city} statue`,
                `${place} ${city} memorial`,
                `${place} ${city} stupa`,
            ];

        case "urban-place":
            return [
                `${place} ${city}`,
                `${place} ${city} chowk`,
                `${place} ${city} bazaar`,
                `${place} ${city} market`,
                `${place} ${city} road`,
            ];

        case "adventure":
            return [
                `${place} ${city}`,
                `${place} ${city} trek`,
                `${place} ${city} trekking`,
                `${place} ${city} peak`,
                `${place} ${city} mount`,
            ];

        case "general":
            return [
                `${place} ${city}`,
            ];
    }
}
