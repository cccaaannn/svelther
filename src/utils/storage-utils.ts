import { LOCAL_STORAGE_SAVE_KEY_PREFIX, type StorageKey } from "@/data/storage";

const loadWeatherItem = <T>(key: StorageKey): T | null => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SAVE_KEY_PREFIX + key));
}

const StorageUtils = {
    loadWeatherItem
}

export default StorageUtils;