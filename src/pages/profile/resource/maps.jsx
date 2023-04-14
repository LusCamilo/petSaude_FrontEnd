import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


export const Maps = () => {

    const containerStyle = {
        width: "100%", 
        height: "400px" 
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCLUoJbgxfN1zJr2LGNo5KRLfZfgMjfbME"
    })

    return isLoaded ? (
        <div className="flex flex-col mt-4 w-full">
            <h2 className='pt-30 text-3xl mb-3 mt-5'>Localização</h2>
            <GoogleMap mapContainerClassName='drop-shadow-xl rounded-lg mt-5' mapContainerStyle={containerStyle} center={center} zoom={19}>
                <Marker position={center} />
            </GoogleMap>
        </div>
    ) : <></>
}

