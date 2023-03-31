import appTheme, { ThemeNames } from "@/data/theme";

const refreshCsVariables = (cssVariables: Map<string, string>) => {
    let values = [];
    for (let [key, value] of cssVariables) {
        values.push(`${key}:${value}`);
    }
    document.documentElement.style.cssText = values.join(';');
}

const changeTheme = (name: ThemeNames) => {
    const cssVariables = new Map<string, string>();

    cssVariables.set("--app-theme-svg-hue-rotate", appTheme[name].svgHueRotate);
    cssVariables.set("--app-theme-primary", appTheme[name].primary);
    cssVariables.set("--app-theme-background-main", appTheme[name].background.main);
    cssVariables.set("--app-theme-background-light", appTheme[name].background.light);
    cssVariables.set("--app-theme-text-primary", appTheme[name].text.primary);
    cssVariables.set("--app-theme-text-secondary", appTheme[name].text.secondary);

    refreshCsVariables(cssVariables);
}

const ThemeUtils = {
    changeTheme
}

export default ThemeUtils;