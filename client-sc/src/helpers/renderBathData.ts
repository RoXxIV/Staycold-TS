/**
 * @fileoverview helper to render weather icon and date format
 */
class RenderBathData {
  // select weather icon depending on weather data from the API
  displayWeatherAsEmoji(data: any) {
    switch (data) {
      case "partiellement nuageux":
        return "cloudy-day-3";
      case "nuageux":
        return "cloudy";
      case "ensoleillé":
        return "day";
      case "pluie":
        return "rainy-5";
      case "neige":
        return "snowy-6";
      case "tempête":
        return "thunder";

      default:
        return "meteo non indiqué*";
    }
  }

  // format date to dd/mm/yyyy
  editDateFormat(date: string | Date | undefined): string {
    if (!date) return "";
    if (typeof date === "string") {
      return date.substring(0, 10).split("-").reverse().join("/");
    } else {
      return date.toISOString().substring(0, 10).split("-").reverse().join("/");
    }
  }
}

export default new RenderBathData();
