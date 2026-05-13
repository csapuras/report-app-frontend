
import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/preact';
import { current_lat, current_lng } from '../mainStore';

export default function MainComponent () {
  // const $current_lat = useStore(current_lat);
  // const $current_lng = useStore(current_lng);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!$current_lat.get() && !$current_lng.get()) {
      console.log("no current latlng, fetching geolocation...");
      if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
    }
    
  }, []);

  useEffect(() => {
    console.log("position updated, setting current latlng in store...");
    current_lat.set(position.latitude);
    current_lng.set(position.longitude);
  },[position])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Interruption Reported!');
  };

  return (
    <>
      <div className="report-container p-4 text-center">
      <form onSubmit={handleSubmit}>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-7xl">
          Report Interruption
        </button>
      </form>
    </div>
    <div>
      {error ? <p>Error: {error}</p> : (
        <p>
          Latitude: {position.latitude}, Longitude: {position.longitude}
        </p>
      )}
    </div>
    </>
    
  );
}