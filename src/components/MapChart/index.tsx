import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import Filter from "./Filter";
import MapView from "./MapView";
import { getCitiesList, getCitySum, getCountriesList, getCountrySum, getStateSum, getStatesList } from "@/services/accessInfo";

const MapChart = () => {
  const [countryName , setCountryName] = useState<string | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [mapViewComponent, setMapViewComponent] = useState<JSX.Element>(<></>);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const countryOptions: string[] = ['Brasil'];
  const stateOptions: string[] = ['Sergipe'];
  const cityOptions: string[] = ['Aracaju'];

  const fetchCoordinates = async (address: string) => {
    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=455ba9c50e4c4c68a798a74897c4a8a9&q=${address}`)
          .then( res => res.json() )
          .then( json => json.results[0].geometry);
    return res;
  };

  const fetchCountriesList = async () => {
    const res = await getCountriesList();
    console.log(res);
  };

  const fetchStateList = async () => {
    const res = await getStatesList('Brazil');
    console.log(res);
  };

  const fetchCityList = async () => {
    const res = await getCitiesList('Brazil', 'Sergipe');
    console.log(res);
  };

  const fetchCountrySum = async () => {
    const res = await getCountrySum('Brazil');
    console.log(res);
  };

  const fetchStateSum = async () => {
    const res = await getStateSum('Brazil', 'Sergipe');
    console.log(res);
  };

  const fetchCitySum = async () => {
    const res = await getCitySum('Brazil', 'Sergipe', 'Aracaju');
    console.log(res);
  };

  fetchCitySum();

  useEffect(() => {
    const buildMapView = async (address: string, localName: string, zoom: number) => {
      const coordinates: {lat: number, lng: number} = await fetchCoordinates(address);
      setMapViewComponent(
        <MapView coordinates={[coordinates.lat, coordinates.lng]} zoom={zoom} localName={localName} accessAmount={100} />
      );
    };

    setIsLoading(true);
    setMapViewComponent(<></>);

    if (cityName !== null && cityName !== '') {
      buildMapView(
        `${cityName}, ${stateName}, ${countryName}`,
        cityName, 9
      );
    } else if (stateName !== null && stateName !== '') {
      buildMapView(
        `${stateName}, ${countryName}`,
        stateName, 6
      );
    } else if (countryName !== null && countryName !== '') {
      buildMapView(
        `${countryName}`,
        countryName, 3
      );
    }

    setIsLoading(false);
  }, [countryName, stateName, cityName]);

  return (
    <>
      <div style={{ display: "flex", marginBottom: '30px' }}>
        <Filter
          title="País"
          value={countryName}
          options={countryOptions}
          setName={setCountryName}
          disabled={false}
          isLoading={isLoading}
          callbackOnChange={() => {
            setStateName(null);
            setCityName(null);
          }}
        />
        <Filter
          title="Estado"
          value={stateName}
          options={stateOptions}
          setName={setStateName}
          disabled={countryName === ""  || countryName === null }
          isLoading={isLoading}
          callbackOnChange={() => {
            setCityName(null);
          }}
        />
        <Filter
          title="Cidade"
          value={cityName}
          options={cityOptions}
          setName={setCityName}
          disabled={stateName === "" || stateName === null}
          isLoading={isLoading}
          callbackOnChange={() => {}}
        />
      </div>
      
      <div style={{ height: "500px", width: "100%", minWidth: "100px" }}>
        {isLoading ? <Spinner color="primary" size="lg"/> : mapViewComponent}
      </div>
    </>
  );
};

export default MapChart;
