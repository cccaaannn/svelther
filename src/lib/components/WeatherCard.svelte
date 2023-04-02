<script lang="ts">
    import Card, { Content } from "@smui/card";
    import CircularProgress from "@smui/circular-progress";
    import type { UnitDetail } from "@/data/unit";
    import type { Weather } from "@/data/weather";
    import WeatherService from "@/service/weather-service";
    import UnitUtils from "@/utils/unit-utils";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import WeatherDetail from "./WeatherDetail.svelte";
    import WeatherSettings from "./WeatherSettings.svelte";
    import WeatherIconUtils from "@/utils/weather-icon-utils";
    import WeatherSettingsStore from "@/stores/weather-settings-store";
    import pressureIcon from "@/assets/img/pressure.svg";
    import rainDropIcon from "@/assets/img/rain-drop.svg";

    let selectedUnitDetail: UnitDetail =
        WeatherSettingsStore.unitDetailStoreInitialState;

    let weatherDataPromise = (async (): Promise<Weather> => {
        const weatherData = await WeatherService.getWeather(
            WeatherSettingsStore.cityStoreInitialState
        );
        console.log(weatherData);
        return weatherData;
    })();

    WeatherSettingsStore.unitDetailStore.subscribe((unitDetail: UnitDetail) => {
        selectedUnitDetail = unitDetail;
    });
    WeatherSettingsStore.cityStore.subscribe((city: string) => {
        weatherDataPromise = WeatherService.getWeather(city);
    });
</script>

<svelte:head>
    {#await weatherDataPromise}
        <title>Svelte weather app</title>
    {:then weatherData}
        <title>
            {`${weatherData.name}: ${UnitUtils.convertTemp(
                weatherData.main.temp,
                selectedUnitDetail.fieldName
            )} ${selectedUnitDetail.temperatureUnit}`}
        </title>
    {:catch error}
        <title>Svelte weather app</title>
    {/await}
</svelte:head>

<div class="card-container">
    <Card>
        {#await weatherDataPromise}
            <Content>
                <div style="display: flex; justify-content: center">
                    <CircularProgress
                        style="height: 32px; width: 32px;"
                        indeterminate
                    />
                </div>
            </Content>
        {:then weatherData}
            <Content>
                <div style="display: flex; justify-content: space-between;">
                    <div class="text-wrap">
                        {`${weatherData.name} ${weatherData.sys.country}`}
                    </div>
                    <div class="text-secondary">
                        {`lo:${weatherData.coord.lon} la:${weatherData.coord.lat}`}
                    </div>
                </div>
                <div
                    style="display: flex; justify-content: center; height: 200px; align-self: start;"
                >
                    <img
                        src={WeatherService.getIconPath(
                            weatherData.weather[0].icon
                        )}
                        alt="weather icon"
                        class="filter-green"
                        style="height: 130%; width: 130%; margin-top: -5%"
                    />
                </div>
                <div style="display: flex; justify-content: start;">
                    <div style="display: flex; align-self: center;">
                        <img
                            src={WeatherService.getIconPath(
                                WeatherIconUtils.getThermometerIconName(
                                    weatherData.main.temp
                                )
                            )}
                            alt="thermometer icon"
                            class="filter-green"
                            style="height: 100px; width: 100px;"
                        />
                    </div>
                    <div
                        style="display: flex; align-self: center; font-size: 50px; margin-left: 0.7rem;"
                    >
                        {UnitUtils.convertTemp(
                            weatherData.main.temp,
                            selectedUnitDetail.fieldName
                        )}
                        <div
                            class="text-secondary"
                            style="margin-left: 0.5rem;"
                        >
                            {selectedUnitDetail.temperatureUnit}
                        </div>
                    </div>
                </div>
                <div>
                    <LayoutGrid>
                        <Cell span={6}>
                            <WeatherDetail
                                detailImage={WeatherService.getIconPath("wind")}
                                detailText={UnitUtils.convertSpeed(
                                    weatherData.wind.speed,
                                    selectedUnitDetail.fieldName
                                )}
                                detailUnit={selectedUnitDetail.speedUnit}
                            />
                        </Cell>
                        <Cell span={6}>
                            <WeatherDetail
                                detailImage={pressureIcon}
                                detailText={weatherData.main.pressure}
                                detailUnit="hPa"
                            />
                        </Cell>
                        <Cell span={6}>
                            <WeatherDetail
                                detailImage={WeatherService.getIconPath(
                                    "cloud"
                                )}
                                detailText={weatherData.clouds.all}
                                detailUnit="%"
                            />
                        </Cell>
                        <Cell span={6}>
                            <WeatherDetail
                                detailImage={rainDropIcon}
                                detailText={weatherData.main.humidity}
                                detailUnit="%"
                            />
                        </Cell>
                    </LayoutGrid>
                </div>
            </Content>
        {:catch error}
            <Content>
                <div style="display: flex; justify-content: center;">
                    City not found
                </div>
            </Content>
        {/await}

        <WeatherSettings />
    </Card>
</div>

<style>
    .card-container {
        min-width: 300px;
    }
    .text-wrap {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
    }
</style>
