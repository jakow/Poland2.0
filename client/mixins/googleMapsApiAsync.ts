import {} from '@types/googlemaps';

let apiLoaded = false;
let scriptAppended = false;
const mapsResolves: Array<(maps: typeof google.maps) => void> = [];
export default function googleMapsApiAsync() {
  (window as any).initMap = () => {
    apiLoaded = true;
    mapsResolves.forEach((resolve) => resolve(google.maps));
  };
  if (apiLoaded) {
    return Promise.resolve(google.maps);
  }
  if (!scriptAppended) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${(window as any).GMAP_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
    scriptAppended = true;
  }
  const promise = new Promise<typeof google.maps>((resolve, reject) => {
    mapsResolves.push(resolve);
  });
  return promise;
}
