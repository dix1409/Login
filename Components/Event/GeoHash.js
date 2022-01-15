export default function CalculateGeoHash(lat, lng) {
  // Compute the GeoHash for a lat/lng point
  const lat1 = parseFloat(lat)
  const lng1 = parseFloat(lng)
  let locationArr = [lat1, lng1]
  try {
    const geoHash = geofire.geohashForLocation(locationArr)
    return geoHash
  } catch (e) {
    console.error(e)
    return null
  }
}
