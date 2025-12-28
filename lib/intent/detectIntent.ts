import {Intent, INTENT_KEYWORDS} from "./intentMap";

export function detectIntent(place: string): Intent {
    const text = place.toLowerCase();
    
    for (const intent of Object.keys(INTENT_KEYWORDS) as Intent[]) {
        if (
            INTENT_KEYWORDS[intent].some(keyword => 
                text.includes(keyword)
            )
        ) {
            return intent;
        }
    }

    return "general";
}