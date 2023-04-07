import { LOCAL_STORAGE_SAVE_KEY_PREFIX, type StorageKey } from '@/data/storage';
import { writable, type Writable } from 'svelte/store'

const persistedStore = <T>(data: T, storageKey: StorageKey) => {

    const _storageKey = LOCAL_STORAGE_SAVE_KEY_PREFIX + storageKey;

    const store = writable(data);
    const { subscribe, set, update } = store;

    localStorage[_storageKey] && set(JSON.parse(localStorage[_storageKey]));

    return {
        subscribe,
        set: (n: T) => {
            localStorage[_storageKey] = JSON.stringify(n);
            set(n);
        },
        update: (callbackFn: (arg0: Writable<T>) => T) => {
            const updatedStore = callbackFn(store);
            localStorage[_storageKey] = JSON.stringify(updatedStore);
            set(updatedStore);
        }
    };
}

export default persistedStore;
