import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { getVeterinary } from '../../../services/integrations/user';

async function getCoordinatesFromCEP(cep) {
  try {

    const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=hiRZUYAH6PaMvzGtLZwZKB7hHzTdiVUK&location=${cep},Brazil`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].locations[0].latLng;
      return { latitude: parseFloat(lat), longitude: parseFloat(lng) };
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error);
    return null;
  }
}

export const Maps = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const getInfoAndCoordinates = async () => {
      try {
        const response = await getVeterinary(localStorage.getItem('__Vet_correctId'));
        const cep = response?.response?.user?.Address?.cep;
        if (cep) {
          const coordinates = await getCoordinatesFromCEP(cep);
          if (coordinates) {
            setCenter(
				{ lat: coordinates.latitude, lng: coordinates.longitude }
			);
          } else {
            window.alert('CEP não encontrado.');
          }
        } else {
          window.alert('CEP não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao obter informações e coordenadas:', error);
      }
    };

    getInfoAndCoordinates();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCLUoJbgxfN1zJr2LGNo5KRLfZfgMjfbME',
  });

  return isLoaded ? (
    <div className="flex flex-col mt-4 w-full">
      <h2 className="pt-30 text-3xl">Localização</h2>
      <GoogleMap
        mapContainerClassName="drop-shadow-xl rounded-lg mt-1"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={19}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : <></>;
};
