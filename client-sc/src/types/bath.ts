/**
 * @fileoverview Type definitions for Bath.
 */

interface IAuthor {
  username: string;
}

type WeatherType =
  | "cloudy-day-3"
  | "cloudy"
  | "day"
  | "rainy-5"
  | "snowy-6"
  | "thunder"
  | "meteo non indiqué*";

export interface IBath {
  id: string;
  author: IAuthor;
  waterTemperature: number;
  timeInWater: number;
  temperatureOutside: number;
  weather: WeatherType;
  wind?: "aucun" | "leger" | "modéré" | "beaucoup";
  recoveryTime?: number;
  afterdrop?: "très intense" | "intense" | "modéré" | "leger" | "aucun" | "";
  globalFeeling?: "très dur" | "dur" | "modéré" | "facile" | "très facile" | "";
  commentary?: string;
  createdAt?: Date;
  updatedAt?: Date;
  formattedCreatedAt?: string;
}
