import axios from "axios";
import type { Forecast } from "@/data/forecast";
import type { Weather } from "@/data/weather";
import WeatherIconUtils from "@/utils/weather-icon-utils";

const API_KEY: string = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const getWeather = async (city: string): Promise<Weather> => {
    return await (await axios(`weather/?q=${city}&appid=${API_KEY}`)).data;
}

const getForecast = async (city: string): Promise<Forecast> => {
    return await (await axios(`forecast/?q=${city}&appid=${API_KEY}`)).data;
}

const getIconPath = (iconId: string): string => {
    return `https://raw.githubusercontent.com/cccaaannn/animated-climacons/master/svgs/${WeatherIconUtils.weatherIconMap[iconId]}`;
}

const WeatherService = {
    getWeather,
    getForecast,
    getIconPath
}

export default WeatherService;