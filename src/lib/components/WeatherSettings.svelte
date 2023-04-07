<script lang="ts">
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    import IconButton, { Icon } from "@smui/icon-button";
    import Textfield from "@smui/textfield";
    import { unitDetails } from "@/data/unit";
    import Select, { Option } from "@smui/select";
    import WeatherSettingsStore from "@/stores/weather-settings-store";
    import ThemeUtils from "@/utils/theme-utils";
    import { themeDetails } from "@/data/theme";
    import settingsIcon from "@/assets/img/settings.svg";

    let selectedUnit = WeatherSettingsStore.unitDetailStoreInitialState.fieldName;
    let city = WeatherSettingsStore.cityStoreInitialState;
    let selectedTheme = WeatherSettingsStore.themeStoreInitialState.fieldName;

    let settingsExtended = false;
    let settingsIconRotation = 0;

    $: selectedUnit && onUnitChange();
    $: selectedTheme && onThemeChange();

    const setUnitStore = () => {
        WeatherSettingsStore.unitDetailStore.set({
            ...unitDetails.filter(
                (unitDetail) => selectedUnit === unitDetail.fieldName
            )[0],
        });
    };

    const setThemeStore = () => {
        WeatherSettingsStore.themeStore.set({
            ...themeDetails.filter(
                (themeDetail) => selectedTheme === themeDetail.fieldName
            )[0],
        });
    };

    const setCityStore = () => {
        WeatherSettingsStore.cityStore.set(city);
    };

    const onUnitChange = () => {
        setUnitStore();
    };

    const onThemeChange = () => {
        setThemeStore();
        ThemeUtils.changeTheme(selectedTheme);
    };

    const debounceTimerTime = 1200;
    let citySelectDebounceTimer = 0;
    const onCityChange = () => {
        clearTimeout(citySelectDebounceTimer);
        citySelectDebounceTimer = setTimeout(() => {
            setCityStore();
        }, debounceTimerTime);
    };
</script>

<Accordion>
    <Panel bind:open={settingsExtended}>
        <Header
            on:mouseenter={() => (settingsIconRotation = 90)}
            on:mouseleave={() => (settingsIconRotation = 0)}
        >
            <img
                src={settingsIcon}
                alt="thermometer icon"
                class="filter-green"
                style={`height: 30px; width: 30px; transform: rotate(${settingsIconRotation}deg);`}
            />
            <IconButton slot="icon" toggle pressed={settingsExtended}>
                <Icon class="material-icons" on>expand_less</Icon>
                <Icon class="material-icons">expand_more</Icon>
            </IconButton>
        </Header>
        <Content>
            <div class="accordion-container">
                <Textfield
                    label="City"
                    variant="outlined"
                    style="width: 100%; border: 1px var(--app-theme-primary) solid;"
                    bind:value={city}
                    on:input={onCityChange}
                />


                <div style="display: flex; justify-content: space-between;">
                    <Select
                        label="Unit"
                        variant="outlined"
                        style="width: 47%; border: 1px var(--app-theme-primary) solid; margin-top: 1em;"
                        bind:value={selectedUnit}
                    >
                        {#each unitDetails as unitDetail}
                            <Option value={unitDetail.fieldName}
                                >{unitDetail.displayName}</Option
                            >
                        {/each}
                    </Select>
                    <Select
                        label="Theme"
                        variant="outlined"
                        style="width: 47%; border: 1px var(--app-theme-primary) solid; margin-top: 1em;"
                        bind:value={selectedTheme}
                    >
                        {#each themeDetails as themeDetail}
                            <Option value={themeDetail.fieldName}
                                >{themeDetail.displayName}</Option
                            >
                        {/each}
                    </Select>
                </div>
            </div>
        </Content>
    </Panel>
</Accordion>

<style>
    .accordion-container {
        max-width: 300px;
    }
</style>
