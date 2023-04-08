<script lang="ts">
    import Card, { Content as CardContent } from "@smui/card";
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
    import Accordion, {
        Panel,
        Header,
        Content as AccordionContent,
    } from "@smui-extra/accordion";
    import IconButton from "@smui/icon-button";
    import Tab, { Icon } from "@smui/tab";
    import TabBar from "@smui/tab-bar";
    import WeatherChart from "./WeatherChart.svelte";
    import type { ThemeDetail } from "@/data/theme";
    import ThemeUtils from "@/utils/theme-utils";
    import { WeatherCardTab, weatherCardTabDetail, type WeatherCardTabDetail } from "@/data/weather-card-tab";

    let settingsExtended = false;

    let selectedUnitDetail: UnitDetail =
        WeatherSettingsStore.unitDetailStoreInitialState;
    let activeTheme = ThemeUtils.getTheme(
        WeatherSettingsStore.themeStoreInitialState.fieldName
    );

    let weatherDataPromise = (async (): Promise<Weather> => {
        const weatherData = await WeatherService.getWeather(
            WeatherSettingsStore.cityStoreInitialState
        );
        return weatherData;
    })();

    WeatherSettingsStore.cityStore.subscribe(async (city: string) => {
        weatherDataPromise = WeatherService.getWeather(city);
    });
    WeatherSettingsStore.unitDetailStore.subscribe((unitDetail: UnitDetail) => {
        selectedUnitDetail = unitDetail;
    });
    WeatherSettingsStore.themeStore.subscribe((themeDetail: ThemeDetail) => {
        activeTheme = ThemeUtils.getTheme(themeDetail.fieldName);
    });

    let activeTab: WeatherCardTabDetail = weatherCardTabDetail[0];
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
            <CardContent>
                <div style="display: flex; justify-content: center">
                    <CircularProgress
                        style="height: 32px; width: 32px;"
                        indeterminate
                    />
                </div>
            </CardContent>
        {:then weatherData}
            <CardContent style="padding-bottom: 0;">
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
                        class="svg-primary-color-filter"
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
                            class="svg-primary-color-filter"
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
                    <TabBar
                        tabs={weatherCardTabDetail}
                        let:tab
                        bind:active={activeTab}
                    >
                        <Tab {tab} style="height: 40px;">
                            <Icon
                                class="material-icons"
                                style="font-size: large;">{tab.icon}</Icon
                            >
                        </Tab>
                    </TabBar>
                </div>

                {#if activeTab.tab === WeatherCardTab.DETAIL}
                    <div>
                        <LayoutGrid>
                            <Cell span={6}>
                                <WeatherDetail
                                    detailImage={WeatherService.getIconPath(
                                        "wind"
                                    )}
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
                {/if}

                {#if activeTab.tab === WeatherCardTab.CHART}
                    <div>
                        <WeatherChart />
                    </div>
                {/if}
            </CardContent>
        {:catch error}
            <CardContent>
                <div style="display: flex; justify-content: center;">
                    City not found
                </div>
            </CardContent>
        {/await}

        <Accordion>
            <Panel bind:open={settingsExtended}>
                <Header>
                    <Icon
                        class="material-icons"
                        style={`color: ${activeTheme.primary} !important;`}
                        >settings</Icon
                    >

                    <IconButton slot="icon" toggle pressed={settingsExtended}>
                        <Icon class="material-icons" on>expand_less</Icon>
                        <Icon class="material-icons">expand_more</Icon>
                    </IconButton>
                </Header>
                <AccordionContent>
                    <WeatherSettings />
                </AccordionContent>
            </Panel>
        </Accordion>
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
