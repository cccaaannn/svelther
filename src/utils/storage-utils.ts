const LOCAL_STORAGE_SAVE_KEY_PREFIX = "SVELTE_WEATHER_APP_DATA_"

type StorageKey = "CITY" | "UNIT" | "THEME";
type StorageStatus = "ENABLED" | "DISABLED";

let currentStorageStatus: StorageStatus = "DISABLED";

const saveItem = (key: StorageKey, value: string | number): void => {
    if(currentStorageStatus === "DISABLED") {
        return;
    }
    localStorage.setItem(LOCAL_STORAGE_SAVE_KEY_PREFIX + key, `${value}`);
}

const loadItem = (key: StorageKey): string | null => {
    return localStorage.getItem(LOCAL_STORAGE_SAVE_KEY_PREFIX + key);
}

const toggleStorageStatus = (status: StorageStatus): void => {
    currentStorageStatus = status;
}

const StorageUtils = {
    saveItem,
    loadItem,
    toggleStorageStatus
}

export default StorageUtils;