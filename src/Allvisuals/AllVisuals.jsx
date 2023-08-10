import "./AllVisuals.css";

import React, { useState } from "react";
import TopicChart from "./Charts/TopicChart";
import SectorFilter from "./filters/SectorFilter";
import CountryChart from "./Charts/CountryChart";
import RegionFilter from "./filters/RegionFilter";
import LineGraph from "./Charts/LineGraph";

function App() {
  const [selectedRegion, setSelectedRegion] = useState("Asia");
  const [selectRegionLD, setSelectRegionLD] = useState("Asia");
  const [selectedSector, setSelectedSector] = useState("Aerospace & defence");
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };
  const handleRegionSelectLD = (region) => {
    setSelectRegionLD(region);
  };
  const handleSectorSelect = (sector) => {
    setSelectedSector(sector);
  };
  return (
    <div className="container">
      <div className="chartCardContainer">
        <SectorFilter onSelectSector={handleSectorSelect} />
        <TopicChart selectedSector={selectedSector} />
      </div>
      <div>
        <div className="chartCardContainer">
          <RegionFilter onSelectRegion={handleRegionSelect} />
          <CountryChart selectedRegion={selectedRegion} />
        </div>
      </div>
      <div className="chartCardContainer">
        <RegionFilter onSelectRegion={handleRegionSelectLD} />
        <LineGraph selectedRegion={selectRegionLD} />
      </div>
    </div>
  );
}

export default App;
