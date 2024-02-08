/**
 * @param weatherIconId - weather icon id
 * @returns weather icon path
 */
export const getWeatherIconPath = async (
  weatherIconId: string
): Promise<string> => {
  try {
    const module = await import(
      `@/assets/images/weather-icons/${weatherIconId}.svg`
    );
    return module.default;
  } catch (e) {
    console.error("Erreur lors du chargement de l'icône météo", e);
    return "";
  }
};
