import { themeDetails, type ThemeDetail } from '@/data/theme';
import { unitDetails, type UnitDetail } from '@/data/unit';
import StorageUtils from '@/utils/storage-utils';
import { writable } from 'svelte/store';

const unitDetailStoreInitialState: UnitDetail = unitDetails[0];
const cityStoreInitialState: string = "turkey";
const themeStoreInitialState: ThemeDetail = themeDetails[0];

const unitDetailStore = writable(unitDetailStoreInitialState);
const cityStore = writable(cityStoreInitialState);
const themeStore = writable(themeStoreInitialState);


unitDetailStore.subscribe((unitDetail: UnitDetail) => {
    StorageUtils.saveItem("UNIT", unitDetail.id);
});
cityStore.subscribe((city: string) => {
    StorageUtils.saveItem("CITY", city);
});
themeStore.subscribe((themeDetail: ThemeDetail) => {
    StorageUtils.saveItem("THEME", themeDetail.id);
});


const WeatherSettingsStore = {
    unitDetailStoreInitialState,
    cityStoreInitialState,
    themeStoreInitialState,
    unitDetailStore,
    cityStore,
    themeStore
}

export default WeatherSettingsStore;
