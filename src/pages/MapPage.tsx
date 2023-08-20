import React from "react";
import MapWithMarkers from "../components/MapWithMarkers";
import LineGraph from "../components/LineGraph";

const MapPage: React.FC = () => {
  return (
    <div className="flex flex-col p-4 bg-slate-300 w-full h-full">
        <MapWithMarkers/>
        <b className="mt-4 mb-2">Chart View</b>
        <LineGraph/>
    </div>
  );
};

export default MapPage;
