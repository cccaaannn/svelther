export enum ThemeNames {
    GREEN = "GREEN",
    BLUE = "BLUE",
    TEAL = "TEAL",
    ORANGE = "ORANGE",
    PINK = "PINK"
}

interface Theme {
    svgHueRotate: string,
    primary: string,
    background: {
        main: string,
        light: string
    },
    text: {
        primary: string,
        secondary: string
    }
}

type AppTheme = {
    [key in ThemeNames]: Theme
}

export interface ThemeDetail {
    displayName: string,
    fieldName: ThemeNames,
}

export const themeDetails: ThemeDetail[] = [
    {
        displayName: "Green",
        fieldName: ThemeNames.GREEN
    },
    {
        displayName: "Blue",
        fieldName: ThemeNames.BLUE
    },
    {
        displayName: "Teal",
        fieldName: ThemeNames.TEAL
    },
    {
        displayName: "Orange",
        fieldName: ThemeNames.ORANGE
    },
    {
        displayName: "Pink",
        fieldName: ThemeNames.PINK
    }
]

const appTheme: AppTheme = {
    GREEN: {
        svgHueRotate: "75deg",
        primary: "#35c840",
        background: {
            main: "#141916",
            light: "#19201C"
        },
        text: {
            primary: "#ffff",
            secondary: "#676767"
        }
    },
    BLUE: {
        svgHueRotate: "155deg",
        primary: "#2fb7df",
        background: {
            main: "#141916",
            light: "#19201C"
        },
        text: {
            primary: "#ffff",
            secondary: "#676767"
        }
    },
    TEAL: {
        svgHueRotate: "125deg",
        primary: "#20c7b2",
        background: {
            main: "#141916",
            light: "#19201C"
        },
        text: {
            primary: "#ffff",
            secondary: "#676767"
        }
    },
    ORANGE: {
        svgHueRotate: "0deg",
        primary: "#d39120",
        background: {
            main: "#141916",
            light: "#19201C"
        },
        text: {
            primary: "#ffff",
            secondary: "#676767"
        }
    },
    PINK: {
        svgHueRotate: "275deg",
        primary: "#cb6ac2",
        background: {
            main: "#141916",
            light: "#19201C"
        },
        text: {
            primary: "#ffff",
            secondary: "#676767"
        }
    }
}

export default appTheme;