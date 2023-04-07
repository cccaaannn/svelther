export enum Unit {
    METRIC = "METRIC",
    IMPERIAL = "IMPERIAL"
}

export interface UnitDetail {
    displayName: string,
    fieldName: Unit,
    speedUnit: string,
    temperatureUnit: string
}

export const unitDetails: UnitDetail[] = [
    {
        displayName: "Metric",
        fieldName: Unit.METRIC,
        speedUnit: "m/s",
        temperatureUnit: "°C",
    },
    {
        displayName: "Imperial",
        fieldName: Unit.IMPERIAL,
        speedUnit: "mPh",
        temperatureUnit: "°F",
    },
];
