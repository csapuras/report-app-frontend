import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


export default function MapComponent () {
  const mapRef = useRef(null);
  const latitude = import.meta.env.PUBLIC_DEFAULT_LAT;
  const longitude = import.meta.env.PUBLIC_DEFAULT_LNG;


  return (
  <>
  <div className="map-container justify-center p-4">
      <MapContainer center={[latitude, longitude]} zoom={100} ref={mapRef} style={{height: "50vh", width: "50vw"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
    </MapContainer>
  </div>
    
  </>  
  )
}