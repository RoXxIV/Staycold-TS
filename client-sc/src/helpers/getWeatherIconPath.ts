/**
 * @fileoverview get weather icon path from weather icon id
 */

/**
 * @param weatherIconId
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
    return ""; // Retourne un chemin par défaut ou une chaîne vide si l'image n'est pas trouvée
  }
};
