export enum WeatherCardTab {
    DETAIL,
    CHART
}

export interface WeatherCardTabDetail {
    tab: WeatherCardTab,
    icon: string
}

export const weatherCardTabDetail: WeatherCardTabDetail[] = [
    {
        tab: WeatherCardTab.DETAIL,
        icon: "grid_view"
    },
    {
        tab: WeatherCardTab.CHART,
        icon: "bar_chart"
    }
];
