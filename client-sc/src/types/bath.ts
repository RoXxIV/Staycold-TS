/**
 * @fileoverview Type definitions for Bath.
 */
export interface IBath {
  id: string;
  author: string;
  waterTemperature: number;
  timeInWater: number;
  temperatureOutside: number;
  weather:
    | "partiellement nuageux"
    | "nuageux"
    | "ensoleillé"
    | "pluie"
    | "neige"
    | "tempête";
  wind?: "aucun" | "leger" | "modéré" | "beaucoup";
  recoveryTime?: number;
  afterdrop?: "très intense" | "intense" | "modéré" | "leger" | "aucun" | "";
  globalFeeling?: "très dur" | "dur" | "modéré" | "facile" | "très facile" | "";
  commentary?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
