export enum Unit {
    METRIC = "METRIC",
    IMPERIAL = "IMPERIAL"
}

export interface UnitDetail {
    id: number,
    displayName: string,
    fieldName: Unit,
    speedUnit: string,
    temperatureUnit: string
}

export const unitDetails: UnitDetail[] = [
    {
        id: 1,
        displayName: "Metric",
        fieldName: Unit.METRIC,
        speedUnit: "m/s",
        temperatureUnit: "°C",
    },
    {
        id: 2,
        displayName: "Imperial",
        fieldName: Unit.IMPERIAL,
        speedUnit: "mPh",
        temperatureUnit: "°F",
    },
];
