
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore';
import ReportForm from './ReportForm';

export default function MainComponent () {
  // const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const $persistentAuthState = useStore(persistentAuthState);
  //  console.log("MainComponent", $persistentAuthState);

  useEffect(() => {
    // if(!$persistentAuthState.lat === null &&  !$persistentAuthState.lng === null) {
    //   console.log("no current latlng, fetching geolocation...");
    //   if ("geolocation" in navigator) {
    //     navigator.geolocation.getCurrentPosition(
    //       (pos) => {
    //         persistentAuthState.setKey('lat', pos.coords.latitude);
    //         persistentAuthState.setKey('lng', pos.coords.longitude);
    //       },
    //       (err) => {
    //         setError(err.message);
    //       }
    //     );
    //   } else {
    //     setError("Geolocation is not supported by your browser");
    //   }
    // } 
  }, []);


  return (
    <>
      <div className="report-container p-4 text-center">
        <ReportForm lat={$persistentAuthState.lat} lng={$persistentAuthState.lng} />
      </div>
    </>
    
  );
}