import React, { useState } from 'react';
import AccordeonSearch from './component/AccordeonSearch';
import AccordeonCoord from './component/AccordeonCoord';
import CarteLeaflet from './component/CarteLeaflet';
import ListeSubstance from './component/listeSubstance';
import './../App.css';

function MapPage() {
  const [selectPosition, setSelectPosition] = useState(null);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", width: "95vw", height: "100vh" }} >
        <div style={{ width: "55vw", height: "100vh" }} >
          <CarteLeaflet selectPosition={selectPosition} />
        </div>
        <div style={{ width: "40vw" }} >
          <AccordeonSearch selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
          <AccordeonCoord />
          <ListeSubstance />
        </div>
      </div>
    </div>
  );
}

export default MapPage;
