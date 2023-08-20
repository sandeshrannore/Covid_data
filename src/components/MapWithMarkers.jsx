import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import {useGetCountryDataQuery} from "../Features/covidSlice/CovidSlice"

function MapWithMarkers() {

  const { data, error, isLoading } = useGetCountryDataQuery()


  const customIcon = new icon({
    iconUrl: require("../images/placeholder.png") , // Replace with the path to your icon image
    iconSize: [32, 32], // Replace with the size of your icon
  });

 
  const position = [20, 77];

  return (
    <MapContainer
      className="h-80 w-full"
      center={position}
      zoom={4}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data? data.map((e) => (
        <Marker key={e.country} position={[e.countryInfo.lat, e.countryInfo.long ]} icon={customIcon}>
        <Popup>
          <b>{e.country}</b> <br/> 
          Total Active: <b>{e.active}</b> <br/>
          Total Recovered: <b>{e.recovered}</b> <br/>
          Total Death: <b>{e.deaths}</b>
        </Popup>
      </Marker>
      )): null}
      
    </MapContainer>
  );
}

export default MapWithMarkers;
