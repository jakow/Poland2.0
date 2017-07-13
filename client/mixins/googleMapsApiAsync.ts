/*
 * Obtain a handle to google maps API using async-await
 * Assumes that a global GMAP_KEY exists in the document
 */
import {} from '@types/googlemaps';

let apiLoaded = false;
let scriptAppended = false;
const mapsResolves: Array<(maps: typeof google.maps) => void> = [];
(window as any).initMap = () => {
  apiLoaded = true;
  mapsResolves.forEach((resolve) => resolve(google.maps));
  const map = new google.maps.Map(document.querySelector('.agenda-event__map'));
};
export default function googleMapsApiAsync() {
  if (apiLoaded) {
    return Promise.resolve(google.maps);
  }
  if (!scriptAppended) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${(window as any).GMAP_KEY}&callback=initMap`;
    document.head.appendChild(script);
    scriptAppended = true;
  }
  const promise = new Promise<typeof google.maps>((resolve, reject) => {
    mapsResolves.push(resolve);
  });
  return promise;
}
