const weatherIconMap = {
    "01d": "sun.svg",
    "01n": "moon.svg",

    "02d": "cloudSun.svg",
    "02n": "cloudMoon.svg",

    "03d": "cloud.svg",
    "03n": "cloud.svg",

    "04d": "cloudFogSunAlt.svg",
    "04n": "cloudFogMoonAlt.svg",

    "09d": "cloudDrizzleSunAlt.svg",
    "09n": "cloudDrizzleMoonAlt.svg",

    "10d": "cloudRainAlt.svg",
    "10n": "cloudRainAlt.svg",

    "11d": "cloudLightningSun.svg",
    "11n": "cloudLightningMoon.svg",

    "13d": "cloudSnowSun.svg",
    "13n": "cloudSnowMoon.svg",

    "50d": "cloudFogSunAlt.svg",
    "50n": "cloudFogMoonAlt.svg",

    "therm0": "thermometer0.svg",
    "therm50": "thermometer50.svg",
    "therm75": "thermometer75.svg",
    "therm100": "thermometer100.svg",

    "wind": "wind.svg",
    "cloud": "cloud.svg"
}

const getThermometerIconName = (tempKelvin: number) => {
    if (tempKelvin >= 303.15) {
        return "therm100";
    }
    if (tempKelvin >= 293.15) {
        return "therm75";
    }
    if (tempKelvin >= 273.15) {
        return "therm50";
    }
    return "therm0";
};

const WeatherIconUtils = {
    weatherIconMap,
    getThermometerIconName
}

export default WeatherIconUtils;
