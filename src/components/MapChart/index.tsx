import { useCallback, useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import Filter from "./Filter";
import MapView from "./MapView";
import { getCitiesList, getCitySum, getCountriesList, getCountrySum, getStateSum, getStatesList } from "@/services/accessInfo";

const MapChart = () => {
  const [countryName, setCountryName] = useState<string | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [mapViewComponent, setMapViewComponent] = useState<JSX.Element>(<></>);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [countrySum, setCountrySum] = useState<number>(0);
  const [stateSum, setStateSum] = useState<number>(0);
  const [citySum, setCitySum] = useState<number>(0);

  const [fetchingData, setFetchingData] = useState(false);

  const fetchCoordinates = async (address: string) => {
    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=455ba9c50e4c4c68a798a74897c4a8a9&q=${address}`)
      .then(res => res.json())
      .then(json => json.results[0].geometry);
    return res;
  };

  const fetchCountriesList = async () => {
    const res = await getCountriesList();
    setCountryOptions(res);
  };

  const fetchStateList = async () => {
    const res = await getStatesList(countryName);
    setStateOptions(res);
  };

  const fetchCityList = async () => {
    const res = await getCitiesList(countryName, stateName);
    setCityOptions(res);
  };

  const fetchCountrySum = async () => {
    const res = await getCountrySum(countryName);
    setCountrySum(res);
  };

  const fetchStateSum = async () => {
    const res = await getStateSum(countryName, stateName);
    setStateSum(res);
  };

  const fetchCitySum = async () => {
    const res = await getCitySum(countryName, stateName, cityName);
    setCitySum(res);
  };

  const buildMapView = useCallback(
    async (address: string, localName: string, zoom: number, accessAmount: number) => {
      const coordinates: { lat: number; lng: number } = await fetchCoordinates(address);
      return (
        <MapView
          coordinates={[coordinates.lat, coordinates.lng]}
          zoom={zoom}
          localName={localName}
          accessAmount={accessAmount}
        />
      );
    },
    []
  );

  useEffect(() => {
    const fetchDataAndBuildMapView = async () => {
      setIsLoading(true);
      setMapViewComponent(<></>);

      if (countryName !== null && countryName !== '') {
        await fetchStateList();
        await fetchCountrySum();

        if (cityName !== null && cityName !== '') {
          await fetchCitySum();
          const mapView = await buildMapView(`${cityName}, ${stateName}, ${countryName}`, cityName, 9, citySum);
          setMapViewComponent(mapView);
        } else if (stateName !== null && stateName !== '') {
          await fetchCityList();
          await fetchStateSum();
          const mapView = await buildMapView(`${stateName}, ${countryName}`, stateName, 6, stateSum);
          setMapViewComponent(mapView);
        } else {
          const mapView = await buildMapView(`${countryName}`, countryName, 3, countrySum);
          setMapViewComponent(mapView);
        }
      }

      setIsLoading(false);
    };

    fetchCountriesList();
    fetchDataAndBuildMapView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryName, stateName, cityName, buildMapView, citySum, countrySum, stateSum]);

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
          disabled={countryName === "" || countryName === null}
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
          callbackOnChange={() => { }}
        />
      </div>
      <div style={{ height: "500px", width: "100%", minWidth: "100px" }}>
        {isLoading ? <Spinner color="primary" size="lg" /> : mapViewComponent}
      </div>
    </>
  );
};

export default MapChart;
