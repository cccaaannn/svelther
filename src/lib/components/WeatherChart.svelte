<script lang="ts">
    import { Line } from "svelte-chartjs";

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from "chart.js";
    import WeatherSettingsStore from "@/stores/weather-settings-store";
    import WeatherService from "@/service/weather-service";
    import type { ForecastWeather } from "@/data/forecast";
    import { onMount } from "svelte";
    import type { ThemeDetail } from "@/data/theme";
    import type { UnitDetail } from "@/data/unit";
    import ChartUtils from "@/utils/chart-uils";

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale
    );

    let selectedCity = WeatherSettingsStore.cityStoreInitialState;
    let selectedUnitDetail: UnitDetail =
        WeatherSettingsStore.unitDetailStoreInitialState;
    let selectedThemeDetail = WeatherSettingsStore.themeStoreInitialState;
    let forecastWeatherData: ForecastWeather[] = [];
    let chartData;

    let forecastDataPromise = async (): Promise<ForecastWeather[]> => {
        const forecastData = await WeatherService.getForecast(selectedCity);
        const forecastWeatherList: ForecastWeather[] = forecastData.list.filter(
            (forecast) => new Date(forecast.dt_txt).getHours() === 12
        );
        return forecastWeatherList;
    };

    WeatherSettingsStore.cityStore.subscribe(async (city: string) => {
        selectedCity = city;
        forecastWeatherData = await forecastDataPromise();
        chartData = ChartUtils.getChartData(
            forecastWeatherData,
            selectedUnitDetail,
            selectedThemeDetail
        );
    });
    WeatherSettingsStore.unitDetailStore.subscribe((unitDetail: UnitDetail) => {
        selectedUnitDetail = unitDetail;
        chartData = ChartUtils.getChartData(
            forecastWeatherData,
            selectedUnitDetail,
            selectedThemeDetail
        );
    });
    WeatherSettingsStore.themeStore.subscribe((themeDetail: ThemeDetail) => {
        selectedThemeDetail = themeDetail;
        chartData = ChartUtils.getChartData(
            forecastWeatherData,
            selectedUnitDetail,
            selectedThemeDetail
        );
    });

    onMount(async () => {
        forecastWeatherData = await forecastDataPromise();
        chartData = ChartUtils.getChartData(
            forecastWeatherData,
            selectedUnitDetail,
            selectedThemeDetail
        );
    });
</script>

<div class="chart-container">
    <Line data={chartData} options={{ responsive: true }} />
</div>

<style>
    .chart-container {
        max-width: 300px;
        padding: 0.7rem 0.5rem;
    }
</style>
