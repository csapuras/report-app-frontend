import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet';
import { useStore } from '@nanostores/react';
import { persistentAuthState } from '../mainStore';


export default function MapComponent () {
  const $persistentAuthState = useStore(persistentAuthState);
  console.log("MapComponent", $persistentAuthState);

  const mapRef = useRef(null);
  const [error, setError] = useState(false);
  const [hasLocation, setHasLocation] = useState($persistentAuthState.lat !== "null" &&  $persistentAuthState.lng !== "null");
  useEffect(() => {
    if(!hasLocation) {
      console.log("no current latlng, fetching geolocation...");
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            persistentAuthState.setKey('lat', pos.coords.latitude);
            persistentAuthState.setKey('lng', pos.coords.longitude);
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        setError("Geolocation is not supported by your browser");
      }
    } 
  }, []);

  return (
  <>
  <div className="map-container justify-center p-4">
      {error && <p className="text-red-500">{error}</p>}
      { hasLocation &&
        <MapContainer center={[$persistentAuthState.lat, $persistentAuthState.lng]} zoom={100} ref={mapRef} style={{height: "50vh", width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[$persistentAuthState.lat, $persistentAuthState.lng]} icon={new Icon({iconUrl: markerIconPng.src, iconSize: [25, 41], iconAnchor: [12, 41]})} />
      </MapContainer>
      }
  </div>
    
  </>  
  )
}