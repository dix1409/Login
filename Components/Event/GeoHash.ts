import * as geofire from "geofire-common"

export default  function CalculateGeoHash(lat, lng) {
  // Compute the GeoHash for a lat/lng point
  const lat1 = parseFloat(lat)
  const lng1 = parseFloat(lng)
  let locationArr = [lat1, lng1]
  try {
    return geofire.geohashForLocation(locationArr)
  } catch (e) {
    console.error(e)
    return null
  }
}
