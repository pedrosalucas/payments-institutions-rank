import { useState } from "react";
import Filter from "./Filter";
import MapView from "./MapView";

// TODO: Adicionar opções dinamicas nos filtros
// TODO: Adicionar regra de desabilitado nos filtros
// TODO: Adicionar busca de longitude e latitude

const MapChart = () => {
  const [countryName , setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [coordinates, setCoordinates] = useState<[number, number]>([-10.9267, -37.0729]);

  return (
    <>
      <div style={{ display: "flex", marginBottom: '30px' }}>
        <Filter title="País" setName={setCountryName} setCoordinates={setCoordinates} />
        <Filter title="Estado" setName={setStateName} setCoordinates={setCoordinates} />
        <Filter title="Cidade" setName={setCityName} setCoordinates={setCoordinates} />
      </div>
      
      <div style={{ height: "500px", width: "100%", minWidth: "100px" }}>
        <MapView coordinates={coordinates} zoom={9} localName={cityName} accessAmount={100} />
      </div>
    </>
  );
};

export default MapChart;
