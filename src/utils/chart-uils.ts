import type { ForecastWeather } from "@/data/forecast";
import type { ThemeDetail } from "@/data/theme";
import type { UnitDetail } from "@/data/unit";
import type { ChartData } from "chart.js";
import ThemeUtils from "./theme-utils";
import UnitUtils from "./unit-utils";

const baseChartData: ChartData<'line'> = {
  labels: [],
  datasets: [
    {
      label: 'Temp',
      tension: 0.4,
      backgroundColor: "white",
      borderColor: 'white',
      pointRadius: 4,
      pointHoverRadius: 9,
      data: []
    },
    {
      label: 'Feels Like',
      tension: 0.4,
      backgroundColor: "white",
      borderColor: 'white',
      pointRadius: 4,
      pointHoverRadius: 9,
      data: []
    }
  ]
};

const getChartData = (forecastWeatherList: ForecastWeather[] | undefined, unitDetail: UnitDetail, themeDetail: ThemeDetail): ChartData<'line'> => {
  const theme = ThemeUtils.getTheme(themeDetail.fieldName);

  baseChartData.datasets[0].backgroundColor = theme.primary;
  baseChartData.datasets[0].borderColor = theme.primary;

  baseChartData.datasets[1].backgroundColor = theme.secondary;
  baseChartData.datasets[1].borderColor = theme.secondary;

  if (forecastWeatherList) {
    const forecastTemperaturesFeelsLike: number[] = [];
    const forecastTemperatures: number[] = [];
    const dates: string[] = [];

    forecastWeatherList.forEach((forecastWeather: ForecastWeather) => {
      forecastTemperaturesFeelsLike.push(UnitUtils.convertTemp(forecastWeather.main.feels_like, unitDetail.fieldName));
      forecastTemperatures.push(UnitUtils.convertTemp(forecastWeather.main.temp, unitDetail.fieldName));
      dates.push(`${new Date(forecastWeather.dt_txt).getDate()}`);
    });

    baseChartData.labels = dates;
    baseChartData.datasets[0].data = forecastTemperatures;
    baseChartData.datasets[1].data = forecastTemperaturesFeelsLike;
  }

  return { ...baseChartData };
}

const ChartUtils = {
  getChartData
}

export default ChartUtils;
