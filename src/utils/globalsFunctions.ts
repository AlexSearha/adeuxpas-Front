import getAuthorizationHeaders from '../store/reducers/api';

// Convertir des degrés en radians
function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

// Calculer les coordonnées d'un point à une distance donnée et un angle par rapport à un point initial
function calculateCoordinates(
  center: number[],
  distance: number,
  angle: number
): number[] {
  const [lat, lon] = center;
  const R = 6371; // Rayon de la Terre en kilomètres

  const lat1 = toRadians(lat);
  const lon1 = toRadians(lon);
  const brng = toRadians(angle);

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distance / R) +
      Math.cos(lat1) * Math.sin(distance / R) * Math.cos(brng)
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(distance / R) * Math.cos(lat1),
      Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2)
    );

  return [(lat2 * 180) / Math.PI, (lon2 * 180) / Math.PI];
}

// Translation des coordonnées autour d'un axe
function translateCoordinates(point: number[], pivot: number[], angle: number) {
  const [px, py] = point;
  const [cx, cy] = pivot;
  const theta = toRadians(angle);

  const qx = cx + (px - cx) * Math.cos(theta) - (py - cy) * Math.sin(theta);
  const qy = cy + (px - cx) * Math.sin(theta) + (py - cy) * Math.cos(theta);

  return [qx, qy];
}

export function calculateCoordinatesWithAngle(
  startCoordinate: number[],
  orientation: number
) {
  const center = startCoordinate;
  // Distance de la médiane (200 km)
  const medianDistance = 200;

  // Angle de la base du triangle (60 degrés dans ce cas)
  const baseAngle = 60;

  // Calcul des coordonnées des deux autres points du triangle (non pivotés)
  const point1 = center;
  const point2 = calculateCoordinates(center, medianDistance, -baseAngle / 2);
  const point3 = calculateCoordinates(center, medianDistance, baseAngle / 2);

  // Angle de translation du triangle autour de l'axe de rotation (en degrés)
  const translationAngle = orientation;

  // Calcul des coordonnées des points translatés
  const translatedPoint1 = translateCoordinates(
    point1,
    center,
    translationAngle
  );
  const translatedPoint2 = translateCoordinates(
    point2,
    center,
    translationAngle
  );
  const translatedPoint3 = translateCoordinates(
    point3,
    center,
    translationAngle
  );

  return [translatedPoint1, translatedPoint2, translatedPoint3];
}

// Conversion pour un allé simple
export function co2FootprintConvertor(distanceInKms: number) {
  return distanceInKms * 0.17082;
}

// Conversion de metres en km et arrondir
export function formatDistance(distance: number) {
  return (distance / 1000).toFixed(1).toString();
}
