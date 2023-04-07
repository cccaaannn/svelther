import { themeDetails, type ThemeDetail } from '@/data/theme';
import { unitDetails, type UnitDetail } from '@/data/unit';
import persistedStore from '@/stores/persisted-store';
import StorageUtils from '@/utils/storage-utils';

const unitDetailStoreInitialState: UnitDetail = StorageUtils.loadWeatherItem<UnitDetail>("UNIT") ?? unitDetails[0];
const cityStoreInitialState: string = StorageUtils.loadWeatherItem<string>("CITY") ?? "turkey";
const themeStoreInitialState: ThemeDetail = StorageUtils.loadWeatherItem<ThemeDetail>("THEME") ?? themeDetails[0];

const unitDetailStore = persistedStore<UnitDetail>(unitDetailStoreInitialState, "UNIT");
const cityStore = persistedStore<string>(cityStoreInitialState, "CITY");
const themeStore = persistedStore<ThemeDetail>(themeStoreInitialState, "THEME");

const WeatherSettingsStore = {
    unitDetailStoreInitialState,
    cityStoreInitialState,
    themeStoreInitialState,
    unitDetailStore,
    cityStore,
    themeStore
}

export default WeatherSettingsStore;
